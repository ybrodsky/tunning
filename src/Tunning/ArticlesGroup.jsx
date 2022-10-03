import React from "react";
import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import {
  GroupedOrderArticlesContext,
  UpperInputsContext,
  BottomInputsContext
} from "./context";
import UpperForm from "./UpperForm";
import BottomForm from "./BottomForm";
import OrderArticleTable from "./ArticlesTable";
import Totals from './Totals';

export default ({ group }) => {
  const [upperInputs, setUpperInputs] = React.useState({
    total_weight: 0,
    bale_count: 0,
    weight_per_bale: 0
  });
  const [bottomInputs, setBottomInputs] = React.useState({
    handling: 0,
    pre_carriage: 0,
    freight: 0,
    transport: 0
  });
  const [GroupedOrderArticles, setGroupedOrderArticles] = React.useState([]);

  React.useEffect(() => {
    setGroupedOrderArticles(group);

    const total_weight = group.reduce(
      (acc, cur) => acc + cur.source_weight || 0,
      0
    );
    const bale_count = group.reduce(
      (acc, cur) => acc + cur.source_amount || 0,
      0
    );

    setUpperInputs({
      ...upperInputs,
      bale_count,
      total_weight,
      weight_per_bale: total_weight / bale_count || 0
    });
  }, [group]);

  // aca estamos dentro de un grupo de OA por tag
  // asi que meti ese grupo dentro de un nuevo contexto
  // y tambien los dos formularios que hay
  return (
    <GroupedOrderArticlesContext.Provider
      value={{ values: GroupedOrderArticles, setValues: setGroupedOrderArticles }}
    >
      <UpperInputsContext.Provider
        value={{ values: upperInputs, setValues: setUpperInputs }}
      >
        <BottomInputsContext.Provider
          value={{ values: bottomInputs, setValues: setBottomInputs }}
        >
          <Box boxShadow={3} mb={2}>
            <Box bgcolor="#D5D5D5" p={2}>
              <Typography>tag: {GroupedOrderArticles[0]?.Article.tag}</Typography>
            </Box>
            <Box p={2}>
              {/** FORMULARIO DE ARRIBA */}
              <UpperForm />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box pr={4}>
                    <OrderArticleTable
                      title="Confirmed (purchase)"
                      propKey="source"
                    />
                  </Box>
                  {/** FORMULARIO DE ABAJO */}
                  <BottomForm />

                  {/** TABLA DE TOTALES */}
                  <Totals />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box pl={4}>
                    <OrderArticleTable
                      title="Receive (sale)"
                      propKey="processor"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </BottomInputsContext.Provider>
      </UpperInputsContext.Provider>
    </GroupedOrderArticlesContext.Provider>
  );
};
