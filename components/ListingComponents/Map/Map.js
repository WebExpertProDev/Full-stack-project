import GoogleMapReact from "google-map-react"

const AnyReactComponent = ({ text }) => (
  <img src="/static/icons/pin2.png" width={40} alt="current"></img>
)

const MapPin = () => <img src="/static/icons/pin2.png" width={40} alt="current"></img>
const Map = () => {
  const center = {
    lat: 49.219554,
    lng: -123.135654
  }

  return (
    <GoogleMapReact
      defaultCenter={center}
      defaultZoom={15}
      bootstrapURLKeys={{ key: "AIzaSyCTRUOp2KXWgoBMJ6kg_1r0m8bsUf6obeA" }}>
      <AnyReactComponent lat={49.219554} lng={-123.135654} text="home" />
      <AnyReactComponent lat={49.221417} lng={-123.135922} text="home" />
    </GoogleMapReact>
  )
}

export default Map
