import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
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
    <Card sx={{ mb: 3 }}>
      <CardHeader
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          fontSize: "18px",
          background: "#f5f5f5",
        }}
        title={<>Tag: {group.tag}</>}
        disableTypography
      />
      <Divider />
      <CardContent>
        <BalesFields name={`groups.${index}.bales`} />
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box pr={4}>
              <Typography fontWeight="bold">Confirmed (purchase)</Typography>
              <OrderArticleTable propKey="source" index={index} group={group} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
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
          </Grid>
        </Grid>

        <Grid container mt={3}>
          <Grid item md={6}>
            <Totals group={group} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
