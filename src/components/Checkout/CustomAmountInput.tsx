import React from "react";
import { formatAmountForDisplay } from "./utils/stripe-helpers";

type Props = {
  name: string;
  value: number;
  min: number;
  max: number;
  currency: string;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const CustomAmountInput = ({
  name,
  value,
  min,
  max,
  currency,
  step,
  onChange,
  className
}: Props) => (
  <label>
    Custom Amount ({formatAmountForDisplay(min, currency)}-
    {formatAmountForDisplay(max, currency)}):
    <br />
    <input
      className={className}
      type="number"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    ></input>
    <br />
    <input
      type="range"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    ></input>
  </label>
);

export default CustomAmountInput;
