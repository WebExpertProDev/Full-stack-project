/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Input
 *
 */
import React from "react";

// InterFaces
import { IInput } from "./Input";

// styles
import styles from "./styles/input.module.scss";

// eslint-disable-next-line object-curly-newline
const Input: React.FunctionComponent<IInput.IProps> = ({
  name,
  type,
  id,
  label,
  hasIcon,
  theme,
  accept,
  placeholder,
  change,
  value,
  error,
  ...props
}) => {
  const haveLabel = theme === "default" && label;
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
          name={name}
          onChange={e => change(e)}
          {...props}
          value={value}
          className={`${styles.input} ${error && styles.error}`}
          accept={accept}
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
  );
};

// default props
Input.defaultProps = {
  theme: "material"
};

export default Input;
