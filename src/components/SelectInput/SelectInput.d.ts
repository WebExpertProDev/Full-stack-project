declare namespace ISelectInput {
  export interface IProps {
    items: Array;
    nextHandler: Function;
    backHandler: Function;
    active?: boolean;
    selectHandler: Function;
  }
}

export { ISelectInput };
