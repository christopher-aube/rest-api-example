import { JSON_DATA } from './validator.types';

export const notEmpty = (val?: string | number) => {
  const isDefined = val !== null && val !== undefined;

  if (!isDefined) {
    return false;
  }

  if (typeof val === 'string') {
    return val.length > 0;
  }

  return true;
};

export const isUnique = (
  list: Array<JSON_DATA>,
  prop: string,
  val?: string
) => {
  if (!notEmpty(val)) {
    return false;
  }

  const listLn = list.length;
  let valid = true;
  let item: JSON_DATA;

  if (!listLn) {
    return valid;
  }

  for (let i = 0; i < listLn; i++) {
    item = list[i];

    if (!item.hasOwnProperty(prop)) {
      continue;
    }

    if (item[prop] === val) {
      valid = false;
      return;
    }
  }

  return valid;
};

export default {
  notEmpty,
  isUnique,
};
