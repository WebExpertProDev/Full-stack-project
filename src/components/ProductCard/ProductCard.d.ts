declare namespace IProductCard {
  export interface IProps {
    cardDetails: {
      id: string;
      image: string;
      city: string;
      streetAddress: string;
      price: number;
      size: number;
      bedroomCount: number;
      bathroomCount: number;
      dateListed: string;
      label: string;
      priceDiff: string;
    };
    size: string;
    active: boolean;
  }
}

export { IProductCard };
