declare namespace IChooseDate2 {
  export interface IProps {
    changePageHandler: Function;
    currentDate: Date;
    setCurrentDate: Function;
    agentInfo: boolean;
    setAgent: Function;
    startDate: Date;
    endDate: Date;
  }
}

export { IChooseDate2 };
