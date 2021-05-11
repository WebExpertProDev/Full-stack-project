/**
 *
 * RadialNumberInput
 *
 */
import React, { useState } from "react"

// InterFaces
import { IRadialNumberInput } from "./RadialNumberInput"

// styles
import styles from "./styles/NumberInput.module.scss"

// svg
import Minuss from "./svg/minus.svg"
import Pluss from "./svg/plus.svg"

export const RadialNumberInput: React.FunctionComponent<IRadialNumberInput.IProps> = ({
  max = 100,
  onChange,
  currentCount,
}) => {
  const [number, setNumber] = useState(currentCount || 0)

  const IncrementItem = () => {
    // if (!onChange) return false;
    setNumber(prevState => {
      if (prevState > max) return prevState
      onChange(prevState + 1)
      return prevState + 1
    })
  }
  const DecreaseItem = () => {
    // if (!onChange) return false;
    setNumber(prevState => {
      if (prevState === 0) return prevState
      onChange(prevState - 1)
      return prevState - 1
    })
  }
  return (
    <div className={styles.InputNumber}>
      <button type="button" onClick={DecreaseItem}>
        <Minuss />
      </button>
      <div className={styles.number}>{number}</div>
      <button type="button" onClick={IncrementItem}>
        <Pluss />
      </button>
    </div>
  )
}

export default RadialNumberInput
