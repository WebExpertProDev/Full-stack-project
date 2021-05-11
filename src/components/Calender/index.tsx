/**
 *
 * DataPicker
 *
 */
import React, {useState} from 'react';
import DatePicker from 'react-datepicker';

// Styles
// import styles from './styles/calender.module.scss';

// InterFaces
import { ICalender } from './Calender';

export const Calender: React.FunctionComponent<ICalender.IProps> = ({selectDate, setDate, startDate, endDate}) => {
  // Date picker State
  //const [datePickerValue, setDatePickerValue] = useState<any>(new Date());
  // const [isOpen, setisOpen] = useState<boolean>(false);
  return (
      <DatePicker
        selected={selectDate}
        onChange={date => setDate(date)}
        minDate={startDate}
        maxDate={endDate}
        shouldCloseOnSelect={false}
        timeInputLabel="Start Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
        inline
      />
  );
};

export default Calender;
