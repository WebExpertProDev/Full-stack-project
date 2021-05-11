/**
 *
 * ImageRadioBtn
 *
 */
import React from "react";
import ClassNames from "classnames";
// components
import RadioButton from "@Components/RadioButton";

// InterFaces

import { IImageRadioBtn } from "./ImageRadioBtn";

// styles
import styles from "./styles/ImgaeRadio.module.scss";

const ImageRadioBtn: React.FunctionComponent<IImageRadioBtn.IProps> = ({
  Image,
  handleClick,
  active,
  inputName,
  checked
}) => {
  const classes = ClassNames(styles["image-radio"], { active });
  return (
    <div
      className={classes}
      style={{ backgroundImage: `url("${Image}")` }}
      onClick={() => handleClick}
    >
      <div className={styles["radio-btn"]}>
        <RadioButton
          name={inputName}
          inputType="radioButton"
          isChecked={checked}
          handleChange={handleClick}
        />
      </div>
    </div>
  );
};

export default ImageRadioBtn;
