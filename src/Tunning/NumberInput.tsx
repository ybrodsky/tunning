import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { InputProps as StandardInputProps } from "@mui/material/Input/Input";
import React, { useEffect, useState } from "react";

export type NumberInputProps = Omit<TextFieldProps, "variant"> & {
  endIcon?: React.ReactNode;
  value: number;
  readOnly?: boolean;
  allowDecimal?: boolean;
};

const INTEGER_REGEX = /^[0-9\-]*$/;
const DECIMAL_REGEX = /^[0-9\-,]*$/;

export default ({
  value,
  onChange,
  endIcon,
  label,
  readOnly,
  allowDecimal = true,
  ...rest
}: NumberInputProps) => {
  const [internalValue, setInternalValue] = useState<string>("");

  // respond to external changes from the source value
  // but keep an internal string value
  useEffect(() => {
    const fixedValue = String(value || "").replace(/\./g, ",");

    setInternalValue(fixedValue);
  }, [value]);

  const onInternalValueChange: StandardInputProps["onChange"] = (evt) => {
    const rawValue = evt.target.value;
    const fixedValue = rawValue.replace(/,/g, ".");
    const parsedNum = Number(fixedValue);

    // if the input value is not a valid number, do not allow that value displayed
    if (
      !(allowDecimal ? DECIMAL_REGEX : INTEGER_REGEX).test(rawValue) ||
      isNaN(parsedNum)
    ) {
      return null;
    }

    // if the value is valid, update the internal string value
    // and fire a change event with a number value
    setInternalValue(rawValue);

    evt.target = {
      // @ts-ignore
      name: rest.name,
      // @ts-ignore
      value: parsedNum,
    };

    return onChange && onChange(evt);
  };

  return (
    <TextField
      size="small"
      margin="dense"
      variant="filled"
      fullWidth
      label={label}
      hiddenLabel={!label}
      inputProps={{
        pattern: "([^0-9]*)",
      }}
      InputProps={{
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
        readOnly,
      }}
      type="text"
      value={internalValue || 0}
      onChange={onInternalValueChange}
      {...rest}
    />
  );
};
