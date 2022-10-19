import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { BalesFields } from "./BalesFields";
import { CostsFields as CostsFields } from "./CostsFields";
import { OrderArticleTable } from "./ArticlesTable";
import { useField, useFormikContext } from "formik";
import { Totals } from "./Totals";
import { TunningGroup, TunningValues } from "./types";

type Props = {
  index: number;
};

export const TunningGroupView = ({ index }: Props) => {
  const [{ value: group }] = useField<TunningGroup>(`groups.${index}`);

  return (
    <Box boxShadow={3} mb={2}>
      <Box bgcolor="#D5D5D5" p={2}>
        <Typography>tag: {group.tag}</Typography>
      </Box>
      <Box p={2}>
        <BalesFields name={`groups.${index}.bales`} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box pr={4}>
              <Typography fontWeight="bold">Confirmed (purchase)</Typography>
              <OrderArticleTable propKey="source" index={index} group={group} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pl={4}>
              <Typography fontWeight="bold">Receive (sale)</Typography>
              <OrderArticleTable
                propKey="processor"
                index={index}
                group={group}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CostsFields name={`groups.${index}.costs`} />

            <Totals group={group} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
