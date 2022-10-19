import { useField } from "formik";
import { useEffect } from "react";
import NumberInput, { NumberInputProps } from "./NumberInput";

export const NumberFld = ({
  name,
  ...rest
}: Omit<NumberInputProps, "value">) => {
  const [field, , helpers] = useField(name!);

  useEffect(() => {
    helpers.setValue(parseFloat(field.value));
  }, [field.value]);

  return <NumberInput {...field} {...rest} />;
};
