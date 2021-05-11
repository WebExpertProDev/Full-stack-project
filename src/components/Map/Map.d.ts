declare namespace IMap {
  export interface IProps {
    latitude: Number;
    longitude: Number;
    json;
    locationchange;
    locationcurrent;
    // height?: string;
    // width?: string;
    mapMarkers?: any;
  }
}

export { IMap };
