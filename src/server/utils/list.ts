import { JSON_DATA, pointer } from './json';

export const sortBy = (
  list: Array<JSON_DATA>,
  fields: Array<string>,
  reverse: boolean = false
) => {
  const fieldsLn = fields.length;

  return list.sort((a, b) => {
    let result = 0;
    let valA;
    let valB;

    for (let i = 0; i < fieldsLn; i++) {
      result = 0;
      valA = pointer(a, fields[i]);
      valB = pointer(b, fields[i]);

      if (valA === undefined) {
        result = 1;
      } else if (valB === undefined) {
        result = -1;
      } else if (valA < valB) {
        result = 1;
      } else if (valA > valB) {
        result = -1;
      }

      if (reverse) {
        result = result * -1;
      }

      if (result !== 0) {
        break;
      }
    }

    return result;
  });
};

export default {
  sortBy,
};
