import * as React from "react";
import marker from "./assets/marker.png";
class MapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };
    this.info = "";
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
    console.log(this.props.description);
    console.log(this.state.isClicked);
  }
  render() {
    const clicked = this.state.isClicked;
    let infoWindow;
    infoWindow = (
      <div
        style={{
          border: "1px solid green",
          position: "absolute",
          backgroundColor: "white",
          color: "#3f51b5",
          textAlign: "center",
          fontSize: 16,
          width: "100px",
          margin: "0px 0px 0px 50px"
        }}
      >
        {this.props.description}
      </div>
    );

    return (
      <div>
        {/* <div
          style={{
            
            border: "5px solid #f44336",
            position: "absolute",
            borderRadius: "40px",
            backgroundColor: "white",
            color: "#3f51b5",
            textAlign: "center",
            padding: 4,
            fontSize: 16,
            fontWeight: "bold"
          }}
          onClick={this.handleClick}
        >
          {this.props.text}
        </div> */}
        <img
          src={marker}
          alt="Marker"
          width="25"
          height="40"
          onClick={this.handleClick}
        />
        {clicked && infoWindow}
      </div>
    );
  }
}

export default MapMarker;
