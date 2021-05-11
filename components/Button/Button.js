import * as React from "react"
import ClassNames from "classnames"

// styles
import styles from "./button.module.css"

export const Button = ({
  theme,
  children,
  hasIcon,
  disabled,
  size,
  handleClick,
  height,
  font,
  fontweight,
  border,
  borderRadius,
  fontFamily,
  customStyles,
  active,
  ...props
}) => {
  const classes = ClassNames("btn", `${styles[theme]}`, ` ${styles[size]}`, `${styles.button}`, {
    [styles.active]: active || false
  })
  const localStyle = {
    fontSize: font,
    height,
    fontWeight: fontweight,
    border,
    borderRadius,
    fontFamily
  }

  const style = { ...localStyle, ...customStyles }
  const onclickHandle = () => {
    if (handleClick) {
      handleClick()
    } else {
      return null
    }
  }
  return (
    <>
      <button
        {...props}
        type="button"
        style={style}
        className={classes}
        disabled={disabled}
        onClick={onclickHandle}>
        <span className={styles.btnIcon}>{hasIcon || null}</span>
        {children}
      </button>
    </>
  )
}

export default Button
