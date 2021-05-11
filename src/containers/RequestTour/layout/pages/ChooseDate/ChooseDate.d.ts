declare namespace IChooseDate {
  export interface IProps {
    changePageHandler: Function;
    currentDate: Date;
    setCurrentDate: Function;
    agentInfo: boolean;
    setAgent: Function;
    setStartDate: Function;
    setEndDate: Function;//get open house dates
  }
}

export { IChooseDate };
