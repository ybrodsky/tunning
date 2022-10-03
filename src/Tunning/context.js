import * as React from "react";

// eslint-disable-next-line
export const UpperInputsContext = React.createContext({
  values: {},
  setValues: null
});

export const BottomInputsContext = React.createContext({
  values: {},
  setValues: null
});

export const OrderArticlesContext = React.createContext({
  original: [],
  mutated: [],
  setValues: null
});

export const GroupedOrderArticlesContext = React.createContext({
  values: [],
  setValues: null,
});
