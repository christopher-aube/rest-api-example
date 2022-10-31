export type JSON_VALUE =
  | string
  | number
  | boolean
  | JSON_DATA
  | Array<JSON_VALUE>;

export type JSON_DATA = {
  [key: string]: JSON_VALUE;
};

export type JSON_FILTER_Operator = 'EQ';

export type JSON_FILTER_Comparison = {
  field: string;
  op: 'EQ';
  value?: string | number | boolean;
};

export type JSON_FILTER_OR = {
  op: 'OR';
  value: Array<JSON_FILTER_Comparison>;
};

export type JSON_FILTER = JSON_FILTER_Comparison | JSON_FILTER_OR;
