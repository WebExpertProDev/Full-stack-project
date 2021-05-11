import React from "react"

// styles
import styles from "./input.module.css"

// eslint-disable-next-line object-curly-newline
const Input = ({
  type,
  id,
  label,
  hasIcon,
  theme,
  placeholder,
  change,
  value,
  error,
  ...props
}) => {
  const haveLabel = theme === "default" && label
  return (
    <>
      <div className={styles[`input-${theme}-container`]}>
        {error && <span className={styles.txterror}>{error}</span>}
        {haveLabel ? (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        ) : null}
        <input
          onChange={(e) => change(e.target.value)}
          {...props}
          value={value}
          className={`${styles.input} ${error && styles.error}`}
          id={id}
          type={type}
          required
          placeholder={placeholder}
        />
        {theme === "material" ? (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        ) : null}

        {hasIcon ? <span className={styles.inputIcon}>{hasIcon}</span> : null}
      </div>
    </>
  )
}

export default Input
