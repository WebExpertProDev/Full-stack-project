import * as React from "react";
import marker from "./assets/marker.png";
import HouseCard from "../../ProductCard";
import styles from "./style/MapMarker.module.scss";
class MapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.info = "";
  }

  render() {
    let cardItem = this.props.details;
    let infoWindow;
    infoWindow = (
      <div
        style={{
          border: "1px solid green",
          position: "absolute",
          left: -40,
          bottom: 20,
          // bottom: 10,
          borderRadius: 20,
          backgroundColor: "white",
          color: "#3f51b5",
          textAlign: "center",
          fontSize: 16,
          width: "100px"
        }}
      >
        {this.props.details.streetAddress}
      </div>
    );

    return (
      <div>
        <img
          src={marker}
          alt="Marker"
          width="20"
          // onClick={this.handleClick}
        />
        {this.props.hover && infoWindow}

        {this.props.isClicked ? (
          <div
            style={{
              border: "1px solid green",
              position: "absolute",
              left: -150,
              top: 50,
              // bottom: 20,
              // bottom: 10,
              borderRadius: 20,
              backgroundColor: "white",
              color: "#3f51b5",
              textAlign: "left",
              fontSize: 16,
              width: "330px",
              zIndex: 1
            }}
          >
            <HouseCard
              cardDetails={{
                id: cardItem._id,
                image: cardItem.image[0],
                city: cardItem.city,
                streetAddress: cardItem.streetAddress,
                price: cardItem.historyPrice[cardItem.historyPrice.length - 1],
                size: cardItem.overview.size,
                bedroomCount: cardItem.overview.bedroomCount,
                bathroomCount: cardItem.overview.bathroomCount,
                dateListed: cardItem.dateListed,
                label: "",
                priceDiff: ""
              }}
              size="lg"
              active={false}
            />
          </div>
        ) : (
          ""
        )}

        {/* {this.props.isClicked? <HouseCard   cardDetails={this.props.details}  size= 'lg'  active = {false}/> : ""} */}
      </div>
    );
  }
}

export default MapMarker;
