import React from "react"

import styles from "./InputSlider.module.css"

const InputSlider = ({ value, onChange, thumbSize }) => (
  <>
    <input
      type="range"
      value={value}
      className={styles["slider"]}
      style={{
        background: `linear-gradient(to right, #00bbd8 0%, #00bbd8 ${value}%, #fff ${value}%, #c7c7c7 0%)`
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  </>
)

export default InputSlider
