declare namespace IVerification {
  export interface IProps {
    changePageHandler: Function;
  }

  export interface IState {
    info: {
      login: boolean;
      title: string;
      msg: string;
      error: string;
    };
  }
}

export { IVerification };
