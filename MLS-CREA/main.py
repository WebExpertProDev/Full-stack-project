from CREA import Session
from HomeCollection import HomeCollection
from dotenv import load_dotenv
from geopy.geocoders import Nominatim
import os, datetime, sys

load_dotenv()
username = os.getenv("crea_username")
password = os.getenv("crea_password")
mongouri = os.getenv("MONGODB_URI")
geolocator = Nominatim(user_agent="mls")


def init():
    """first time accessing crea database, only need to call this once
    copy MLS CREA database to our own database"""
    session = Session("https://data.crea.ca/Login.svc/Login", username, password)
    property_list = session.Search("Property", "Property")["RETS"]["RETS-RESPONSE"]["Property"]
    DB = HomeCollection(mongouri)
    query_string = ""
    count = 0
    while count <= len(property_list):
        upper = count + 100
        if upper > len(property_list):
            upper = len(property_list)
        for i in range(count, upper):
            query_string += property_list[i]["@ID"] + ","
        count += 100
        query_string = "(ID={})".format(query_string[:-1])
        home_documents = []
        for home in session.Search("Property", "Property", query=query_string)["RETS"]["RETS-RESPONSE"]["PropertyDetails"]:
            home_document, flag = mls_to_home_schema(home)
            if not flag:
                continue
            home_documents.append(home_document)
        DB.insert_many(home_documents)
        query_string = ""


def update(date):
    """call this function at a regular bases to keep the db up to date (i.e. consistent with MLS CREA database)
    date(GMT/UTC) format: yyyy-mm-ddThh:mm:ssZ
    """
    session = Session("https://data.crea.ca/Login.svc/Login", username, password)
    property_changed = session.Search("Property", "Property", count=1, query="(LastUpdated={})".format(date), limit=100, offset=101)
    if not property_changed:
        return
    pages = int(property_changed["RETS"]["RETS-RESPONSE"]["Pagination"]["TotalPages"]) - 1
    property_changed = property_changed["RETS"]["RETS-RESPONSE"]["PropertyDetails"]
    DB = HomeCollection(mongouri)
    for i in property_changed:
        DB.update_one({"@ID": i["@ID"]}, {"$set": i})

    count = 1
    while count < pages:
        property_changed = session.Search("Property", "Property", query="(LastUpdated={})".format(date), count=1, limit=100, offset=(count*100)+1)["RETS"]["RETS-RESPONSE"]["PropertyDetails"]
        for i in property_changed:
            home_document, flag = mls_to_home_schema(i)
            if not flag:
                continue
            DB.update_one({"@ID": i["@ID"]}, {"$set": home_document})
        count += 1

def mls_to_home_schema(home):
    home_document = {}
    propertyFeatures = { "swimmingPool": False, "elevator": False, "petFriendly": False, "parking": False, "airConditioning": False, "balcony": False, "bbq": False, "ensuitLandry": False, "furnished": False, "bicycleParking": False, "securitySystem": False, "reconstructed": False, "gym": False, "hardwoodFloors": False, "garden": False }

    if home.get("TransactionType", "") == "For lease":
        home_document["forRent"] = True
        home_document["historyPrice"] = [home.get("Lease", "0")]
        home_document["rentPerUnit"] = home.get("LeasePerUnit", "")
        home_document["rentPerTime"] = home.get("LeasePerTime", "")
    elif home.get("TransactionType", "") == "For sale":
        home_document["forRent"] = False
        home_document["historyPrice"] = [home.get("Price", "0")]
    else:
        home_document["forRent"] = False
        home_document["historyPrice"] = [home.get("Price", "0")]

    home_document["views"] = "0"
    home_document["description"] = home.get("PublicRemark", "")
    photo = home.get("Photo", {"PropertyPhoto": []})
    if isinstance(photo["PropertyPhoto"], dict):
        home_document["image"] = [photo["PropertyPhoto"]["LargePhotoURL"]]
    else:
        home_document["image"] = [i["LargePhotoURL"] for i in photo["PropertyPhoto"]]
    home_document["isAvailable"] = True
    home_document["dateListed"] = datetime.datetime.strptime(home["@LastUpdated"], "%a, %d %b %Y %H:%M:%S GMT").strftime("%Y/%m/%d")
    if "AgentDetails" in home and isinstance(home["AgentDetails"], list):
        home_document["agentID"] = [i["@ID"] for i in home["AgentDetails"]]
    elif "AgentDetails" in home:
        home_document["agentID"] = [home["AgentDetails"]["@ID"]]
    home_document["availabilityDate"] = {"start": "", "end": ""}
    home_document["hasAI"] = False
    home_document["hasAIAndAgent"] = False
    home_document["propertyTaxes"] = "0"  # TODO: MLS doesn't have this data
    home_document["maintenanceFee"] = home.get("MaintenanceFee", "0")

    if "Address" in home:
        home_document["streetAddress"] = home["Address"].get("StreetAddress", "")
        home_document["city"] = home["Address"].get("City", "")
        home_document["province"] = home["Address"].get("Province", "")
        home_document["postalCode"] = home["Address"].get("PostalCode", "")
        if "Latitude" in home["Address"]:
            home_document["latAndLong"] = {"lat": home["Address"]["Latitude"], "Long": home["Address"]["Longitude"]}
        else:
            location = geolocator.geocode(home["Address"].get("StreetAddress", "") + " " + home["Address"].get("City", ""))
            if location:
                home_document["latAndLong"] = {"lat": str(location.latitude), "Long": str(location.longitude)}
            else:
                home_document["latAndLong"] = {"lat": "", "Long": ""}
                return ({}, False)
    else:
        return ({}, False)

    overview = {}
    overview["propertyType"] = home["Building"].get("Type", "") or home.get("PropertyType", "")
    overview["yearBuilt"] = home["Building"].get("ConstructedDate", "")
    if "SizeInterior" in home["Building"] and home["Building"]["SizeInterior"]:
        overview["size"] = home["Building"]["SizeInterior"][:-5] or home["Building"].get("TotalFinishedArea", " sqft")[:-5]
    overview["bedroomCount"] = home["Building"].get("BathroomTotal", "")
    overview["bedroomCount"] = home["Building"].get("BedroomsTotal", "")
    parking = home.get("ParkingSpaces", {}).get("Parking", [])
    if isinstance(parking, list):
        overview["parkingCount"] = str(len(parking))
    else:
        overview["parkingCount"] = "1"
    if "ParkingSpaceTotal" in home:
        overview["parkingCount"] = home["ParkingSpaceTotal"]
    home_document["overview"] = overview

    features = home.get("Features", "")
    amenities = home["Building"].get("Amenities", "")
    propertyFeatures["swimmingPool"] = "Swimming" in amenities
    propertyFeatures["elevator"] = "Elevator" in features
    propertyFeatures["petFriendly"] = "No Pet Home" not in features
    if overview["parkingCount"] != "0":
        propertyFeatures["parking"] = True
    propertyFeatures["airConditioning"] = ("Air Conditioning" in amenities) or ("air condition" in home["Building"].get("CoolingType", "").lower())
    propertyFeatures["balcony"] = ("Balcony" in features) or ("Balconies" in amenities)
    propertyFeatures["ensuitLandry"] = ("Laundry" in features) or ("Laundry" in amenities) or (("Washer" in home["Building"].get("Appliances", "")) and ("Dryer" in home["Building"].get("Appliances", "")))
    propertyFeatures["furnished"] = "Furnished" in amenities
    propertyFeatures["bicycleParking"] = "Bicycle parking" in features
    propertyFeatures["securitySystem"] = "Security/Concierge" in amenities
    propertyFeatures["gym"] = "Exercise" in amenities
    propertyFeatures["hardwoodFloors"] = ("Carpet Free" in features) or ("Hardwood" in home["Building"].get("FlooringType", ""))
    propertyFeatures["garden"] = ("yard" in features) or ("Yard" in features)
    if amenities:
        propertyFeatures["more"] = features + ", " + amenities
    else:
        propertyFeatures["more"] = features
    home_document["propertyFeatures"] = propertyFeatures

    utilities = {}
    if home.get("UtilitiesAvailable", {}):
        if isinstance(home["UtilitiesAvailable"].get("Utility", []), dict):
            uType = home["UtilitiesAvailable"].get("Utility", [])["Type"]
            if uType == "Electricity":
                utilities["electricity"] = True
            elif uType == "Water":
                utilities["hydro"] = True
            elif uType == "Cable":
                utilities["tvOrCable"] = True
            elif uType == "Natural Gas":
                utilities["gas"] = True
        else:
            for i in home["UtilitiesAvailable"].get("Utility", []):
                uType = i["Type"]
                if uType == "Electricity":
                    utilities["electricity"] = True
                elif uType == "Water":
                    utilities["hydro"] = True
                elif uType == "Cable":
                    utilities["tvOrCable"] = True
                elif uType == "Natural Gas":
                    utilities["gas"] = True
    home_document["utilities"] = utilities

    home_document["nearby"] = {}

    home_document["securityDeposit"] = "0"  # TODO: MLS doesn't have this data
    home_document["isMLSListed"] = True
    home_document["mlsNumber"] = home["ListingID"]

    return home_document, True


if __name__ == '__main__':
    mode = sys.argv[1]
    # mode = "init"
    if mode == "init":
        print(username, password, mongouri)
        # init()
    elif mode == "update":
        date = sys.argv[2]
        print(username, password, date)
        # update(date)
    else:
        exit(1)
