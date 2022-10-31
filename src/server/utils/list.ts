import { JSON_DATA, pointer } from './json';

export const sortBy = (
  list: Array<JSON_DATA>,
  fields: Array<string>,
  reverse: boolean = false
) => {
  const fieldsLn = fields.length;

  return list.sort((a, b) => {
    let result = 0;
    let valA: any;
    let valB: any;

    for (let i = 0; i < fieldsLn; i++) {
      result = 0;
      valA = pointer(a, fields[i]);
      valB = pointer(b, fields[i]);

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
      }

      if (typeof valB === 'string') {
        valB = valB.toLowerCase();
      }

      if (valA === valB) {
        return 0;
      }

      result = valA < valB ? -1 : 1;
      return reverse ? result * -1 : result;
    }

    return result;
  });
};

export default {
  sortBy,
};
