declare namespace IProductCard {
  export interface IProps {
    cardDetails: {
      image: string;
      city: string;
      streetAddress: string;
      price: number;
      size: number;
      bedRoomCount: number;
      bathRoomCount: number;
    };
    size: string;
    onDoubleClick?: Function;
  }
}

export type { IProductCard };
