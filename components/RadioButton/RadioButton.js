/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */

import React from "react"

import styles from "./RadioButton.module.css"

export const RadioButton = ({
  inputType,
  hasIcon,
  label,
  value,
  handleChange,
  isChecked,
  name
}) => {
  return (
    <div className={styles[inputType]}>
      <input
        className="mx-2"
        value={value}
        type="radio"
        name={name}
        checked={isChecked}
        onChange={handleChange}
      />
      {hasIcon || null}
      <label htmlFor={name} className={isChecked ? styles.labelactive : styles.label}>
        {label}
      </label>
    </div>
  )
}
export default RadioButton
