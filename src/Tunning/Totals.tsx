import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TunningGroup } from "./types";

const round = (v: number) => Math.round(v * 100) / 100;

type Props = {
  group: TunningGroup;
};

export const Totals = ({ group }: Props) => {
  const { bales, costs, articles, originalArticles } = group;

  const cost =
    costs.handling + costs.pre_carriage + costs.freight + costs.transport;

  const weightPerBale = group.bales.bale_count
    ? group.bales.total_weight / group.bales.bale_count || 0
    : 0;

  const total = round(
    articles.reduce((acc, oa) => {
      const source =
        weightPerBale * parseFloat(oa.source_amount || 0) * oa.source_price;
      const processor =
        weightPerBale *
        parseFloat(oa.processor_amount || 0) *
        oa.processor_price;

      return acc + (processor - source);
    }, 0) - cost
  );
  const totalSource = round(
    articles.reduce(
      (acc, oa) =>
        acc + weightPerBale * parseFloat(oa.source_amount) * oa.source_price,
      0
    )
  );

  const originalTotal = round(
    originalArticles.reduce((acc, oa) => {
      const source =
        weightPerBale * parseFloat(oa.source_amount || 0) * oa.source_price;
      const processor =
        weightPerBale *
        parseFloat(oa.processor_amount || 0) *
        oa.processor_price;

      return acc + (processor - source);
    }, 0) - cost
  );

  const originalTotalSource = round(
    originalArticles.reduce(
      (acc, oa) =>
        acc + weightPerBale * parseFloat(oa.source_amount) * oa.source_price,
      0
    )
  );

  const totalDifference = total - originalTotal;

  const perTonneDifference =
    round(total / bales.total_weight) -
    round(originalTotal / bales.total_weight);
  const buyingDifference =
    round(totalSource / bales.total_weight) -
    round(originalTotalSource / bales.total_weight);

  const getColor = (v: number) => {
    return v > 0 ? "green" : v < 0 ? "red" : "initial";
  };

  return (
    <Box mt={4}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Value</TableCell>
            <TableCell>Before</TableCell>
            <TableCell>After</TableCell>
            <TableCell>Added value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Total result</TableCell>
            <TableCell>€ {originalTotal}</TableCell>
            <TableCell>€ {total}</TableCell>
            <TableCell>
              <Typography
                component="span"
                style={{ color: getColor(totalDifference) }}
              >
                € {totalDifference}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total per tonne</TableCell>
            <TableCell>€ {round(originalTotal / bales.total_weight)}</TableCell>
            <TableCell>€ {round(total / bales.total_weight)}</TableCell>
            <TableCell>
              <Typography
                component="span"
                style={{ color: getColor(perTonneDifference) }}
              >
                € {perTonneDifference}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Buying price per ton of cut</TableCell>
            <TableCell>
              € {round(originalTotalSource / bales.total_weight)}
            </TableCell>
            <TableCell>€ {round(totalSource / bales.total_weight)}</TableCell>
            <TableCell>
              <Typography
                component="span"
                style={{ color: getColor(buyingDifference) }}
              >
                € {buyingDifference}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cost per ton</TableCell>
            <TableCell>€ {round(cost / bales.total_weight)}</TableCell>
            <TableCell>€ {round(cost / bales.total_weight)}</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
