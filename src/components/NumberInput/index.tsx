/**
 *
 * NumberInput
 *
 */
import React, { useState } from 'react';

// InterFaces
import { INumberInput } from './NumberInput';

// styles
import styles from './styles/NumberInput.module.scss';

export const NumberInput: React.FunctionComponent<INumberInput.IProps> = ( { value, setValue } ) => {

  return (
  <div className={styles.InputNumber}>

    <button onClick={() => {if (!(value <= 0)) setValue( value - 5 )}}>
      <span>-</span>
    </button>

    <button type="button" className={styles.number}>
      {value}
    </button>

    <button onClick={() => {if (!(value >= 30)) setValue( value + 5 )}}>
      <span>+</span>
    </button>

  </div>
);}

NumberInput.propTypes = {};

export default NumberInput;
