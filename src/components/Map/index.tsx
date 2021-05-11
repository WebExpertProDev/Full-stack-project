import * as React from "react";
import GoogleMapReact from "google-map-react";
import point from "./lilhouse.JPG";
import { IMap } from "./Map";

const AnyReactComponent = ({ text }) => (
  <img
    src="http://localhost:5000/static/avatars/current.png"
    width={40}
    alt="current"
  ></img>
);
const MapPin = () => (
  <img
    src="http://localhost:5000/static/avatars/3397991951553667168.svg"
    alt="Logo"
  ></img>
);
const Map: React.FunctionComponent<IMap.IProps> = ({
  latitude,
  longitude,
  json
}) => {
  const center = {
    lat: latitude,
    lng: longitude
  };

  return (
    <GoogleMapReact center={center} defaultZoom={11}>
      <AnyReactComponent
        key={2}
        lat={center.lat}
        lng={center.lng}
        text="My Marker"
      />
      {/* displaying the data sent from listing page */}
      {json == null
        ? ""
        : json.map(item => {
            return (
              <MapPin
                key={item._id}
                lat={parseFloat(item.latAndLong.lat)}
                lng={parseFloat(item.latAndLong.Long)}
                description={item.streetAddress}
              />
            );
          })}
    </GoogleMapReact>
  );
};

export default Map;
