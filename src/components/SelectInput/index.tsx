/**
 *
 * SelectInput
 *
 */
import React from "react"

// InterFaces
import { ISelectInput } from "./SelectInput"

// styles
import styles from "./styles/SelectInput.module.scss"

// svg
import Back from "./svg/back.svg"
import Next from "./svg/next.svg"

const SelectInput: React.FunctionComponent<ISelectInput.IProps> = ({ offerItems }) => (
  <div className={styles.SelectInput}>
    <Back className={styles.backSvg} />

    {offerItems.map(offerItem => (
      <div className={offerItem.status ? styles.active : false} key={offerItem}>
        <span>{offerItem.cost}</span>
      </div>
    ))}

    <Next className={styles.nextSvg} />
  </div>
)

export default SelectInput
