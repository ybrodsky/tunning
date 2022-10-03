import React from "react";
import { Box } from "@mui/material";
import NumberInput from "../NumberInput";
import {
  BottomInputsContext,
} from "./context";

export default () => {
  const { values, setValues } = React.useContext(BottomInputsContext);

  const onChange = (n) => (e) => {
    const newValues = {
      ...values,
      [n]: parseFloat(e.target.value),
    };

    setValues(newValues);
  };

  const cost = values.handling + values.pre_carriage + values.freight + values.transport;

  return (
    <Box mt={4}>
      <Box display="flex" mb={2}>
        <Box mr={1}>
          <NumberInput
            label="Handling"
            value={values.handling}
            onChange={onChange("handling")}
          />
        </Box>
        <Box mr={1}>
          <NumberInput
            label="Pre-carriage"
            value={values.pre_carriage}
            onChange={onChange("pre_carriage")}
          />
        </Box>
        <Box mr={1}>
          <NumberInput
            label="Freight"
            value={values.freight}
            onChange={onChange("freight")}
          />
        </Box>
        <Box mr={1}>
          <NumberInput
            label="Transport"
            value={values.transport}
            onChange={onChange("transport")}
          />
        </Box>
        <Box>
          <NumberInput
            label="Total cost"
            value={cost}
            onChange={onChange("cost")}
            readOnly
          />
        </Box>
      </Box>
    </Box>
  );
};
