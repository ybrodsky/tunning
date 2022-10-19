import React from "react";
import { Box, Button } from "@mui/material";
import { TunningGroupView } from "./TunningGroupView";
import { Formik } from "formik";
import { groupBy, cloneDeep, sumBy } from "lodash";
import { Order } from "./types";

type Props = {
  order: Order;
};

export const Tunning = ({ order }: Props) => {
  const groupedArticles = groupBy(
    order.OrderArticles.filter((oa: any) => oa.Article.tag),
    (oa) => oa.Article.tag
  );

  const groups = Object.keys(groupedArticles).map((tag) => {
    const articles = groupedArticles[tag];
    const totalWeight = sumBy(articles, "source_weight");
    const baleCount = sumBy(articles, "source_amount");

    return {
      tag,
      originalArticles: cloneDeep(articles),
      articles,
      bales: {
        total_weight: totalWeight,
        bale_count: baleCount,
      },
      costs: {
        handling: 0,
        pre_carriage: 0,
        freight: 0,
        transport: 0,
      },
    };
  });

  return (
    <Box p={2}>
      <Formik
        initialValues={{
          groups,
        }}
        onSubmit={console.log}
      >
        <>
          {groups.map((g, index) => (
            <TunningGroupView key={index} index={index} />
          ))}
          <Box mt={4} textAlign="right">
            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </>
      </Formik>
    </Box>
  );
};
