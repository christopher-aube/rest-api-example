export type RequesterPayload = {
  [key: string]:
    | string
    | number
    | boolean
    | RequesterPayload
    | Array<RequesterPayload>;
};
