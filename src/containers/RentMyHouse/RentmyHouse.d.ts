declare namespace IRentmyHouse {
  export interface IProps {
    changePageHandler: Function;
  }
  export interface Home {
    forRent: boolean;
    views: string;
    description: string;
    historyPrice: Array<string>;
    image: Array<string>;
    isAvailable: boolean;
    dateListed: string;
    agentID: Array<string>;
    availabilityDate: string;
    hasAI: boolean;
    hasAIAndAgent: boolean;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    latAndLong: {
      lat: string;
      Long: string;
    };
    openHouseDate: {
      start: string;
      end: string;
    };
    overview: {
      propertyType: string;
      yearBuilt: string;
      size: string;
      bedroomCount: string;
      bathroomCount: string;
      parkingCount: string;
    };
    propertyFeatures: {
      swimmingPool: boolean;
      elevator: boolean;
      petFriendly: boolean;
      parking: boolean;
      airConditioning: boolean;
      balcony: boolean;
      bbq: boolean;
      ensuitLandry: boolean;
      furnished: boolean;
      bicycleParking: boolean;
      securitySystem: boolean;
      reconstructed: boolean;
      gym: boolean;
      hardwoodFloors: boolean;
      garden: boolean;
    };
    utilities: {
      hydro: boolean;
      heat: boolean;
      water: boolean;
      internet: boolean;
      tvOrCable: boolean;
    };
    nearby: {
      School: Array<string>;
      Bank: Array<string>;
      Foodservice: Array<string>;
      Parks: Array<string>;
      Stores: Array<string>;
      Others: Array<string>;
    };
    securityDeposit: string;
    mlsNumber: string;
    isMLSListed: boolean;
  }
}

export { IRentmyHouse };
