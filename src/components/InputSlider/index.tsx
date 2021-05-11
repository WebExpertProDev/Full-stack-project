/**
 *
 * InputSlider
 *
 */
import React from "react";

// InterFaces
import { IInputSlider } from "./InputSlider";
import styles from "./styles/InputSlider.module.scss";

const InputSlider: React.FunctionComponent<IInputSlider.IProps> = ({
  value,
  onChange,
  thumbSize
}) => (
  <>
    <input
      type="range"
      value={value}
      className={styles[thumbSize]}
      style={{
        background: `linear-gradient(to right, #00bbd8 0%, #00bbd8 ${value /
          1000}%, #fff ${value / 1000}%, #c7c7c7 0%)`
      }}
      onChange={e => onChange(Number(e.target.value) * 1000)}
    />
  </>
);

// default props
InputSlider.defaultProps = {
  thumbSize: "slider"
};

export default InputSlider;
