import React from "react";
import { Box, Button } from "@mui/material";
import ArticlesGroup from "./ArticlesGroup";
import {
  OrderArticlesContext,
} from "./context";

export default ({ order }) => {
  const [groupedArticles, setGroupedArticles] = React.useState([]);
  const [OrderArticles, setOrderArticles] = React.useState([]);

  // los articulos de la orden tienen que ser agrupados
  // dependiendo de lo que diga esta poronga del tag.
  // Cada grupo va a renderear una tabla con inputs y cuentas
  // que son independientes entre grupos. Pero al mismo tiempo cuando cambias
  // algo en ese grupo va a tener que reflejarse en el OrderArticles que los contiene a todos
  React.useEffect(() => {
    const grouped = order.OrderArticles.reduce((acc, cur) => {
      const tag = cur.Article.tag;

      if (!tag) {
        return acc;
      }

      return {
        ...acc,
        [tag]: (acc[tag] || []).concat([cur])
      };
    }, {});

    setGroupedArticles(Object.values(grouped).filter((arr) => arr.length > 1));
    setOrderArticles(order.OrderArticles);
  }, []);

  const onSave = () => {
    // submiteo
    // esto es como si estuviera modificado en el form finances
    // pero lo unico que nos interesa que se puede haber modificado aca es
    // source_amount / processor_amount
    // el resto de las cosas quedan igual
    console.log(OrderArticles);
  };

  // asi que en este OrderArticlesContext estoy metiendo
  // los order articles originales y tambien los OrderArticles que voy mutando
  // cosa que cuando le des a "save" tengas los OrderArticles mutados por cada grupo
  // todos en un solo lugar
  return (
    <Box>
      <OrderArticlesContext.Provider
        value={{
          original: order.OrderArticles,
          mutated: OrderArticles,
          setValues: setOrderArticles,
        }}
      >
        {groupedArticles.map((ga, i) => (
          <ArticlesGroup key={i} group={ga} />
        ))}
      </OrderArticlesContext.Provider>
      <Box mt={4} textAlign="right">
        <Button color="primary" variant="contained" onClick={onSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
