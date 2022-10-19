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
import { NumDisplay } from "./NumDisplay";
import { OrderArticle, TunningGroup } from "./types";

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
            <TableCell width={130}>Quality</TableCell>
            <TableCell width={100} align="right">
              Weight (t)
            </TableCell>
            <TableCell width={100} align="right">
              Bale count
            </TableCell>
            <TableCell width={130} align="right">
              Unit price
            </TableCell>
            <TableCell align="right">Price per quality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {group.articles.map((orderArticle, articleIndex) => {
            const weight = calculateWeight(orderArticle);

            return (
              <TableRow key={articleIndex}>
                <TableCell>{orderArticle.Article.name_en}</TableCell>
                <TableCell align="right">
                  {<NumDisplay value={weight} />} t
                </TableCell>
                <TableCell align="right">
                  <NumberFld
                    name={`groups.${index}.articles.${articleIndex}.${amountKey}`}
                  />
                </TableCell>
                <TableCell align="right">{orderArticle[priceKey]} €</TableCell>
                <TableCell align="right">
                  {
                    <NumDisplay
                      value={weight * orderArticle[priceKey]}
                      currency
                    />
                  }
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
              align="right"
            >
              <NumDisplay value={totalWeight} /> t
            </TableCell>
            <TableCell
              align="right"
              style={{
                color: totalBales !== totalOpositeBales ? "red" : "inherit",
              }}
            >
              <NumDisplay value={totalBales} />
            </TableCell>
            <TableCell align="right">&nbsp;</TableCell>
            <TableCell align="right">
              <NumDisplay
                value={sumBy(
                  group.articles,
                  (oa) => calculateWeight(oa) * oa[priceKey]
                )}
                currency
              />
              &nbsp;&nbsp;
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
