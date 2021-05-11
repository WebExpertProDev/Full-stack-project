import requests
from urllib3.util import parse_url
from xmltodict import parse
import json
import Exceptions


class Session():
    def __enter__(self):
        return self

    def __init__(self, loginURL, username, password):
        self.__setUrls(loginURL)

        self.session = requests.Session()
        self.session.auth = requests.auth.HTTPDigestAuth(
            username=username, password=password)

        self.__login(loginURL=loginURL)

    def Search(self, resource, resourceClass, select="", query="(ID=*)", count=0, limit="None", offset=1, format="STANDARD-XML", queryType="DMQL2", culture="en-CA"):
        data = {
            "Format": format,
            "SearchType": resource,
            "Class": resourceClass,
            "QueryType": queryType,
            "Query": query,
            "Count": count,
            "Limit": limit,
            "Offset": offset,
            "Culture": culture,
            "Select": select
        }
        # req = self.session.post("http://data.crea.ca/Search.svc/Search?Format=Standard-XML&SearchType=Property&Class=Property&QueryType=DMQL2&Select=ListingID&Culture=en-CA&Query=(ID=22683364)&Count=0")

        req = self.session.post(self.__searchURL, data=data)
        if int(parse(req.text)["RETS"]["@ReplyCode"]) == 20206:
            raise Exceptions.InvalidSyntax
        elif int(parse(req.text)["RETS"]["@ReplyCode"]) == 20201:
            return None
        else:
            return json.loads(json.dumps(parse(req.text)))

    def GetObject(self, resource, type_, id, culture="en-CA"):
        data = {
            "Resource": resource,
            "Type": type_,
            "ID": id,
            "Culture": culture
        }
        req = self.session.get(self.__objectURL, params=data)
        if int(parse(req.text)["RETS"]["@ReplyCode"]) == 20400:
            raise Exceptions.UnknownResource
        if int(parse(req.text)["RETS"]["@ReplyCode"]) == 20401:
            raise Exceptions.UnknownType
        if int(parse(req.text)["RETS"]["@ReplyCode"]) == 20402:
            raise Exceptions.UnkownIdentifier
        if int(parse(req.text)["RETS"]["@ReplyCode"]) == 20403:
            raise Exceptions.NoObjectFound
        else:
            return json.loads(json.dumps(parse(req.text)))

    def GetMetadata(self, type_, id, format="COMPACT"):
        data = {
            "Format": format,
            "Type": type_,
            "ID": id
        }

        req = self.session.post(self.__metaURL, data=data)
        if int(parse(req.text)["RETS"]["@ReplyCode"]) == 20501:
            raise Exceptions.UnkownMetadataType
        if int(parse(req.text)["RETS"]["@ReplyCode"]) == 20502:
            raise Exceptions.UnknownMetadataIdentifier
        if int(parse(req.text)["RETS"]["@ReplyCode"]) == 20503:
            raise Exceptions.NoMetadataFound
        else:
            return json.loads(json.dumps(parse(req.text)))

    def __setUrls(self, url):
        parsedURL = parse_url(url)
        base = str(parsedURL[0]) + "://" + str(parsedURL[2])

        self.__loginURL = url
        self.__metaURL = base + "/Metadata.svc/GetMetadata"
        self.__searchURL = base + "/Search.svc/Search"
        self.__objectURL = base + "/Object.svc/GetObject"
        self.__logoutURL = base + "/Logout.svc/Logout"

    def __login(self, loginURL):
        req = self.session.post(loginURL)
        if req.status_code == 401:
            raise Exceptions.IncorrectLogin

    def __logout(self):
        self.session.post(self.__logoutURL)

    def __exit__(self, type, value, traceback):
        self.__logout()

