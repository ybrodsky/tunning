import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { NumberFld } from "./NumberFld";
import { useField, useFormikContext } from "formik";
import { GroupBales, TunningValues } from "./types";
import NumberInput from "./NumberInput";
import { get } from "lodash";

const round = (v: number) => Math.round(v * 100) / 100;

type Props = {
  name: string;
};

export const BalesFields = ({ name }: Props) => {
  const [{ value: values }, , { setValue }] = useField<GroupBales>(name);

  return (
    <Box display="flex" mb={5}>
      <Box mr={1}>
        <NumberFld label="Total weight" name={`${name}.total_weight`} />
      </Box>
      <Box mr={1}>
        <NumberFld label="Bale count" name={`${name}.bale_count`} />
      </Box>
      <Box mr={1}>
        <NumberInput
          label="Weight per bale"
          readOnly
          value={
            values.bale_count
              ? round(values.total_weight / values.bale_count)
              : 0
          }
        />
      </Box>
    </Box>
  );
};
