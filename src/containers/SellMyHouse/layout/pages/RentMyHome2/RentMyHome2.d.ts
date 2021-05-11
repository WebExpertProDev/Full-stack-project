import { HotModuleReplacementPlugin } from "webpack";

declare namespace IRentMyHome2 {
  export interface IProps {
    changePageHandler: Function;
    homeInfo: Home;
    setHomeInfo: Function;
  }
}

export { IRentMyHome2 };
