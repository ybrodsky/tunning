import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { sumBy } from "lodash";
import { NumberFld } from "./NumberFld";
import { OrderArticle, TunningGroup } from "./types";

const round = (v: number) => Math.round(v * 100) / 100;

type Props = {
  propKey: "source" | "processor";
  group: TunningGroup;
  index: number;
};

export const OrderArticleTable = ({ propKey, group, index }: Props) => {
  const amountKey = `${propKey}_amount` as const;
  const opositeAmountKey = `${
    propKey === "source" ? "processor" : "source"
  }_amount` as const;
  const priceKey = `${propKey}_price` as const;

  const weightPerBale = group.bales.bale_count
    ? group.bales.total_weight / group.bales.bale_count
    : 0;

  const calculateWeight = (oa: OrderArticle) =>
    weightPerBale * (oa[amountKey] || 0);

  const totalWeight = sumBy(
    group.articles,
    (oa) => weightPerBale * (oa[amountKey] || 0)
  );

  const totalOpositeWeight = sumBy(
    group.articles,
    (oa) => weightPerBale * (oa[opositeAmountKey] || 0)
  );

  const totalBales = sumBy(group.articles, amountKey);
  const totalOpositeBales = sumBy(group.articles, opositeAmountKey);

  return (
    <Box>
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
          {group.articles.map((orderArticle, articleIndex) => {
            const weight = calculateWeight(orderArticle);

            return (
              <TableRow key={articleIndex}>
                <TableCell>{orderArticle.Article.name_en}</TableCell>
                <TableCell>{round(weight)}</TableCell>
                <TableCell>
                  <NumberFld
                    name={`groups.${index}.articles.${articleIndex}.${amountKey}`}
                  />
                </TableCell>
                <TableCell>{orderArticle[priceKey]} €</TableCell>
                <TableCell>
                  {round(weight * orderArticle[priceKey])} €
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell
              style={{
                color: totalWeight !== totalOpositeWeight ? "red" : "inherit",
              }}
            >
              {totalWeight}
            </TableCell>
            <TableCell
              style={{
                color: totalBales !== totalOpositeBales ? "red" : "inherit",
              }}
            >
              {totalBales}
            </TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>
              {round(
                sumBy(
                  group.articles,
                  (oa) => calculateWeight(oa) * oa[priceKey]
                )
              )}{" "}
              € &nbsp;&nbsp;
              <small style={{ color: "green" }}>
                ({propKey === "source" ? 1 : 2})
              </small>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
