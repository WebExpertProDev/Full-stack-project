import React, { useState } from "react"

// styles
import styles from "./NumberInput.module.css"

export const NumberInput = () => {
  const [value, setValue] = useState(5)
  return (
    <div className={styles.InputNumber}>
      <button className="cursor-pointer" onClick={() => setValue((prev) => prev - 1)}>
        -
      </button>
      <p className={`${styles.number} flex justify-center`}>{value}</p>
      <button className="cursor-pointer" onClick={() => setValue((prev) => prev + 1)}>
        +
      </button>
    </div>
  )
}

NumberInput.propTypes = {}

export default NumberInput
