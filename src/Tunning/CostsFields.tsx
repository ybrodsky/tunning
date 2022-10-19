import React from "react";
import { Box, Typography } from "@mui/material";
import { NumberFld } from "./NumberFld";
import { useField, useFormikContext } from "formik";
import { GroupCosts, TunningValues } from "./types";
import { get } from "lodash";
import NumberInput from "./NumberInput";

type Props = {
  name: string;
};

export const CostsFields = ({ name }: Props) => {
  const [{ value: values }] = useField<GroupCosts>(name);

  const total =
    values.handling + values.pre_carriage + values.freight + values.transport;

  return (
    <Box mt={6}>
      <Typography mb={3} fontWeight="bold">
        Costs
      </Typography>
      <Box display="flex" mb={2}>
        <Box mr={1} maxWidth={150}>
          <NumberFld label="Handling" name={`${name}.handling`} />
        </Box>
        <Box mr={1} maxWidth={150}>
          <NumberFld label="Pre-carriage" name={`${name}.pre_carriage`} />
        </Box>
        <Box mr={1} maxWidth={150}>
          <NumberFld label="Freight" name={`${name}.freight`} />
        </Box>
        <Box mr={1} maxWidth={150}>
          <NumberFld label="Transport" name={`${name}.transport`} />
        </Box>
        <Box maxWidth={200}>
          <NumberInput
            readOnly
            label="Total"
            value={total}
            InputProps={{ endAdornment: "EUR" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
