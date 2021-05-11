declare namespace IRentMyHome3 {
  export interface IProps {
    changePageHandler: Function;
  }
  export interface IState {
    streetAddress?: string;
    unitNumber?: string;
    postalCode?: string;
    city?: object | null;
    province?: object | null;
  }
}

export { IRentMyHome3 };
