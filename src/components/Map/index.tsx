import * as React from "react";
import GoogleMapReact from "google-map-react";
import point from "./lilhouse.JPG";
import { IMap } from "./Map";
import MapMarker from "./mapMarker";
import HouseCard from "../ProductCard";

const CurrentLocation = () => (
  <img
    src="http://localhost:5000/static/avatars/current.png"
    width={40}
    alt="current"
  ></img>
);
const Map: React.FunctionComponent<IMap.IProps> = ({
  latitude,
  longitude,
  json,
  locationchange,
  locationcurrent
}) => {
  const center = {
    lat: latitude,
    lng: longitude
  };
  const [currentLocation, changelocation] = React.useState({
    lat: latitude,
    lng: longitude
  });
  React.useEffect(() => {
    changelocation({ lat: center.lat, lng: center.lng });
  }, [center.lat, center.lng]);

  const [currentkey, changekey] = React.useState(null);

  const onChildMouseEnter = key => {
    changekey(key);
  };
  const onChildMouseExit = () => {
    changekey(null);
  };
  const onClick = (key, props) => {
    changelocation({ lat: props.lat, lng: props.lng });
    locationchange(key);
    console.log(key);
    console.log(props);
  };
  const onClickOutside = () => {
    locationchange(null);
    console.log(json);
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyCoqgrOVdCrEJtcZTYFXPAMMW9UBNUltaU" }}
      center={currentLocation}
      defaultZoom={11}
      onChildMouseEnter={onChildMouseEnter}
      onChildMouseLeave={onChildMouseExit}
      onChildClick={onClick}
      onClick={onClickOutside}
    >
      <CurrentLocation key={1} lat={center.lat} lng={center.lng} />
      {/* displaying the data sent from listing page */}
      {json == null
        ? ""
        : json.map(item => {
            if (!(item.latAndLong.lat == "" && item.latAndLong.Long == "")) {
              return (
                <MapMarker
                  key={item._id}
                  lat={parseFloat(item.latAndLong.lat)}
                  lng={parseFloat(item.latAndLong.Long)}
                  details={item}
                  hover={currentkey == item._id}
                  isClicked={locationcurrent == item._id}
                />
              );
            }
          })}
    </GoogleMapReact>
  );
};

export default Map;
