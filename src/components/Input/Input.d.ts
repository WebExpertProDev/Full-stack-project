import React from "react";

declare namespace IInput {
  export interface IProps {
    name?: string;
    type: React.PropsWithChildren;
    label?: string;
    hasIcon?: any;
    theme?: string;
    placeholder?: string;
    accept?: string;
    change: Function;
    value: string | null;
    id?: string;
    error?: any;
  }
}

export { IInput };
