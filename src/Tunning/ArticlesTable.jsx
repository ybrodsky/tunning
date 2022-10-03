import React from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from "@mui/material";
import NumberInput from "../NumberInput";
import {
  UpperInputsContext,
  GroupedOrderArticlesContext,
  OrderArticlesContext,
} from "./context";

const round = (v) => Math.round(v * 100) / 100;

export default ({ title, propKey }) => {
  const { values: upperValues } = React.useContext(UpperInputsContext);
  const { values: GroupedOrderArticles, setValues: setGroupedValues } = React.useContext(GroupedOrderArticlesContext);
  const { mutated: OrderArticles, setValues } = React.useContext(OrderArticlesContext);

  const amount = `${propKey}_amount`;
  const opositeAmountKey = `${propKey === "source" ? "processor" : "source"}_amount`;
  const price = `${propKey}_price`;
  const weightProp = `${propKey}_weight`;

  const calculateWeight = (oa) => upperValues.weight_per_bale * parseFloat(oa[amount] || 0);
  const calculateOpositeWeight = (oa) => upperValues.weight_per_bale * (oa[opositeAmountKey] || 0);

  // la tabla tiene un solo input the modifica source_amount o processor_amount
  // dependiendo cual de las dos tablas sea.
  // Ahora nosotros tenemos un context OrderArticlesContext que tiene "mutated" con los OA que voy cambiando a medida que
  // se cambian los inputs, "original" con los OA como eran originalmente
  // pero tambien esta el otro context GroupedOrderArticlesContext que tiene los OA por grupo
  // Necesito llevar los dos actualizados y me canse asi que llamo el setter de los dos. Se debe poder hacer un
  // nivel mas arriba que cuando el "mutated" cambie actualize los GroupedOrderArticlesContext
  // habra que probar
  const onOrderArticleChange = (id) => (values) => {
    setValues(
      OrderArticles.reduce((acc, oa) => {
        if (oa.id !== id) {
          return acc.concat([oa]);
        }

        return acc.concat([
          {
            ...oa,
            ...values
          }
        ]);
      }, [])
    );
    setGroupedValues(
      GroupedOrderArticles.reduce((acc, oa) => {
        if (oa.id !== id) {
          return acc.concat([oa]);
        }

        return acc.concat([
          {
            ...oa,
            ...values
          }
        ]);
      }, [])
    );
  };

  // estas cuentas van con los GroupedOrderArticles
  // que es lo que nos interesa en esta tabla.
  const totalWeight = round(
    GroupedOrderArticles.reduce((acc, oa) => acc + calculateWeight(oa), 0)
  );
  const totalOpositeWeight = round(
    GroupedOrderArticles.reduce((acc, oa) => acc + calculateOpositeWeight(oa), 0)
  );
  const totalBales = GroupedOrderArticles.reduce((acc, oa) => acc + parseFloat(oa[amount] || 0), 0);
  const totalOpositeBales = GroupedOrderArticles.reduce(
    (acc, oa) => acc + oa[opositeAmountKey],
    0
  );

  return (
    <Box>
      <Typography fontWeight="bold">{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quality</TableCell>
            <TableCell>Weight (t)</TableCell>
            <TableCell>Bale count</TableCell>
            <TableCell>Unit price</TableCell>
            <TableCell>Price per quality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GroupedOrderArticles.map((orderArticle, i) => {
            const weight = calculateWeight(orderArticle);
            const onChange = onOrderArticleChange(orderArticle.id);

            return (
              <TableRow key={i}>
                <TableCell>{orderArticle.Article.name_en}</TableCell>
                <TableCell>{round(weight)}</TableCell>
                <TableCell>
                  <NumberInput
                    value={orderArticle[amount]}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);

                      return onChange({
                        [amount]: isNaN(v) ? '' : v,
                        [weightProp]: weight
                      });
                    }}
                  />
                </TableCell>
                <TableCell>{orderArticle[price]} €</TableCell>
                <TableCell>{round(weight * orderArticle[price])} €</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell
              style={{
                color: totalWeight !== totalOpositeWeight ? "red" : "inherit"
              }}
            >
              {totalWeight}
            </TableCell>
            <TableCell
              style={{
                color: totalBales !== totalOpositeBales ? "red" : "inherit"
              }}
            >
              {totalBales}
            </TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>
              {round(
                GroupedOrderArticles.reduce(
                  (acc, oa) => acc + calculateWeight(oa) * oa[price],
                  0
                )
              )}{" "}
              €
              &nbsp;&nbsp;
              <small style={{ color: 'green' }}>({ propKey === 'source' ? 1 : 2})</small>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
