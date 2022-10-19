export type TunningValues = {
  groups: TunningGroup[];
};

export type TunningGroup = {
  tag: string;
  articles: any[];
  originalArticles: any[];
  bales: GroupBales;
  costs: GroupCosts;
};

export type GroupBales = {
  total_weight: number;
  bale_count: number;
};

export type GroupCosts = {
  handling: number;
  pre_carriage: number;
  freight: number;
  transport: number;
};

export type Order = {
  OrderArticles: OrderArticle[];
};

export type OrderArticle = {
  source_amount: number;
  processor_amount: number;
  Article: {
    tag: string;
  };
};
