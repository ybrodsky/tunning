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
import { NumDisplay } from "./NumDisplay";

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

  const total =
    articles.reduce((acc, oa) => {
      const source =
        weightPerBale * parseFloat(oa.source_amount || 0) * oa.source_price;
      const processor =
        weightPerBale *
        parseFloat(oa.processor_amount || 0) *
        oa.processor_price;

      return acc + (processor - source);
    }, 0) - cost;
  const totalSource = articles.reduce(
    (acc, oa) =>
      acc + weightPerBale * parseFloat(oa.source_amount) * oa.source_price,
    0
  );

  const originalTotal =
    originalArticles.reduce((acc, oa) => {
      const source =
        weightPerBale * parseFloat(oa.source_amount || 0) * oa.source_price;
      const processor =
        weightPerBale *
        parseFloat(oa.processor_amount || 0) *
        oa.processor_price;

      return acc + (processor - source);
    }, 0) - cost;

  const originalTotalSource = originalArticles.reduce(
    (acc, oa) =>
      acc + weightPerBale * parseFloat(oa.source_amount) * oa.source_price,
    0
  );

  const totalDifference = total - originalTotal;

  const perTonneDifference =
    total / bales.total_weight - originalTotal / bales.total_weight;
  const buyingDifference =
    totalSource / bales.total_weight - originalTotalSource / bales.total_weight;

  return (
    <Box mt={4}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Value</TableCell>
            <TableCell align="right">Before</TableCell>
            <TableCell align="right">After</TableCell>
            <TableCell align="right">Added value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Total result</TableCell>
            <TableCell align="right">
              <NumDisplay value={originalTotal} currency />
            </TableCell>
            <TableCell align="right">
              <NumDisplay value={total} currency />
            </TableCell>
            <TableCell align="right">
              <NumDisplay value={totalDifference} profit />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total per tonne</TableCell>
            <TableCell align="right">
              <NumDisplay value={originalTotal / bales.total_weight} currency />
            </TableCell>
            <TableCell align="right">
              <NumDisplay value={total / bales.total_weight} currency />
            </TableCell>
            <TableCell align="right">
              <NumDisplay value={perTonneDifference} profit />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Buying price per ton of cut</TableCell>
            <TableCell align="right">
              <NumDisplay
                value={originalTotalSource / bales.total_weight}
                currency
              />
            </TableCell>
            <TableCell align="right">
              <NumDisplay value={totalSource / bales.total_weight} currency />
            </TableCell>
            <TableCell align="right">
              <NumDisplay value={buyingDifference} profit />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cost per ton</TableCell>
            <TableCell align="right">
              <NumDisplay value={cost / bales.total_weight} currency />
            </TableCell>
            <TableCell align="right">
              <NumDisplay value={cost / bales.total_weight} currency />
            </TableCell>
            <TableCell align="right">-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
