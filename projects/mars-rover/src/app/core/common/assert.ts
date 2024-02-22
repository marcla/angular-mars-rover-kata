const isNil = (val: unknown): boolean => val == null;
const isString = (value: unknown): value is string => typeof value === 'string';
const isEmptyString = (value: unknown): boolean => isNil(value) || value === '';
const isNumber = (value: unknown): value is number => typeof value === 'number';

const assert = {
  isNil,
  isString,
  isEmptyString,
  isNumber,
};

export default assert;
