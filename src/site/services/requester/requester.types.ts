export type PayloadData =
  | string
  | number
  | boolean
  | RequesterPayload
  | Array<PayloadData>;

export type RequesterPayload = {
  [key: string]: PayloadData;
};
