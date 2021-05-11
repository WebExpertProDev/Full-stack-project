/**
 *
 * SelectInput
 *
 */
import React, { useState, useEffect } from "react";

// InterFaces
import { ISelectInput } from "./SelectInput";

// styles
import styles from "./styles/SelectInput.module.scss";

// svg
import Back from "./svg/back.svg";
import Next from "./svg/next.svg";

const SelectInput: React.FunctionComponent<ISelectInput.IProps> = ({
  nextHandler,
  backHandler,
  selectHandler,
  items
}) => {
  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <div className={styles.SelectInput}>
      <Back className={styles.backSvg} onClick={backHandler} />

      {items.map(item => (
        <div
          className={item.status ? styles.active : false}
          onClick={() => selectHandler(item)}
          key={item}
        >
          <span>{item.cost}</span>
        </div>
      ))}
      <Next className={styles.nextSvg} onClick={nextHandler} />
    </div>
  );
};

export default SelectInput;
