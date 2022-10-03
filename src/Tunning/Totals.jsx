import React from "react";
import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
} from "@mui/material";
import {
  BottomInputsContext,
  UpperInputsContext,
  OrderArticlesContext,
  GroupedOrderArticlesContext,
} from "./context";

const round = (v) => Math.round(v * 100) / 100;

export default () => {
  const { values } = React.useContext(BottomInputsContext);
  const { values: upperValues } = React.useContext(UpperInputsContext);
  const { values: GroupedOrderArticles } = React.useContext(GroupedOrderArticlesContext);
  const { original: OrderArticles } = React.useContext(OrderArticlesContext);

  // para armar esta tabla que te muestra las cuentas luego de los cambios
  // pero tambien quiere que se muestre la cuenta antes de que uno toque
  // necesitamos los OrderArticles como estaban al principio; de ahi el "original"
  // de OrderArticlesContext
  const cost =
    values.handling + values.pre_carriage + values.freight + values.transport;
  const total = round(
    GroupedOrderArticles.reduce((acc, oa) => {
      const source =
        upperValues.weight_per_bale * parseFloat(oa.source_amount || 0) * oa.source_price;
      const processor =
        upperValues.weight_per_bale * parseFloat(oa.processor_amount || 0) * oa.processor_price;

      return acc + (processor - source);
    }, 0) - cost
  );
  const totalSource = round(
    GroupedOrderArticles.reduce(
      (acc, oa) =>
        acc + upperValues.weight_per_bale * parseFloat(oa.source_amount) * oa.source_price,
      0
    )
  );

  const originalTotal = round(
    OrderArticles.reduce((acc, oa) => {
      const source =
        upperValues.weight_per_bale * parseFloat(oa.source_amount || 0) * oa.source_price;
      const processor =
        upperValues.weight_per_bale * parseFloat(oa.processor_amount || 0) * oa.processor_price;

      return acc + (processor - source);
    }, 0) - cost
  );
  const originalTotalSource = round(
    OrderArticles.reduce(
      (acc, oa) =>
        acc + upperValues.weight_per_bale * parseFloat(oa.source_amount) * oa.source_price,
      0
    )
  );
  const totalDifference = total - originalTotal;
  const perTonneDifference = round(total / upperValues.total_weight) - round(originalTotal / upperValues.total_weight);
  const buyingDifference = round(totalSource / upperValues.total_weight) - round(originalTotalSource / upperValues.total_weight);

  const getColor = (v) => {
    return v > 0 ? 'green' : (v < 0 ? 'red' : 'initial');
  };

  return (
    <Box mt={4}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Value
            </TableCell>
            <TableCell>
              Before
            </TableCell>
            <TableCell>
              After
            </TableCell>
            <TableCell>
              Added value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Total result
            </TableCell>
            <TableCell>
              € {originalTotal}
            </TableCell>
            <TableCell>
              € {total}
            </TableCell>
            <TableCell>
              <Typography component="span" style={{ color: getColor(totalDifference) }}>
                € {totalDifference}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Total per tonne
            </TableCell>
            <TableCell>
              € {round(originalTotal / upperValues.total_weight)}
            </TableCell>
            <TableCell>
              € {round(total / upperValues.total_weight)}
            </TableCell>
            <TableCell>
              <Typography component="span" style={{ color: getColor(perTonneDifference) }}>
                € {perTonneDifference}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Buying price per ton of cut
            </TableCell>
            <TableCell>
              € {round(originalTotalSource / upperValues.total_weight)}
            </TableCell>
            <TableCell>
              € {round(totalSource / upperValues.total_weight)}
            </TableCell>
            <TableCell>
              <Typography component="span" style={{ color: getColor(buyingDifference) }}>
                € {buyingDifference}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Cost per ton
            </TableCell>
            <TableCell>
              € {round(cost / upperValues.total_weight)}
            </TableCell>
            <TableCell>
              € {round(cost / upperValues.total_weight)}
            </TableCell>
            <TableCell>
              -
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
