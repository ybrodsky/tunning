import React from "react";
import { Box } from "@mui/material";
import NumberInput from "../NumberInput";
import { UpperInputsContext } from "./context";

const round = (v) => Math.round(v * 100) / 100;

export default () => {
  const { values, setValues } = React.useContext(UpperInputsContext);

  const onChange = (n) => (e) => {
    const newValues = {
      ...values,
      [n]: parseFloat(e.target.value)
    };
    newValues.weight_per_bale =
      newValues.total_weight / newValues.bale_count || 0;

    setValues(newValues);
  };

  return (
    <Box display="flex" mb={5}>
      <Box mr={1}>
        <NumberInput
          label="Total weight"
          value={values.total_weight}
          onChange={onChange("total_weight")}
        />
      </Box>
      <Box mr={1}>
        <NumberInput
          label="Bale count"
          value={values.bale_count}
          onChange={onChange("bale_count")}
        />
      </Box>
      <Box mr={1}>
        <NumberInput
          label="Weight per bale"
          value={round(values.weight_per_bale)}
          readOnly
          onChange={() => {}}
        />
      </Box>
    </Box>
  );
};
