declare namespace IPrivacy {
  export interface IProps {
    phoneNum: string;
    name: string;
    DeclinePrivacy: Function;
    useEmail: boolean;
    cleanPhone: Function;
    cleanName: Function;
    type: string;
  }
}

export { IPrivacy };
