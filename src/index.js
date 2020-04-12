import _ from 'lodash';
import parseToObject from './parsers';

export default (first, second) => {
  const obj1 = parseToObject(first);
  const obj2 = parseToObject(second);
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const compareData = (key) => {
    const acc = [];
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(obj1[key], obj2[key])) {
        acc[acc.length] = `    ${key}: ${obj1[key]}`;
      }
      if (!_.isEqual(obj1[key], obj2[key])) {
        acc[acc.length] = `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
      }
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      acc[acc.length] = `  + ${key}: ${obj2[key]}`;
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      acc[acc.length] = `  - ${key}: ${obj1[key]}`;
    }

    return acc;
  };

  return `{\n${keys.map(compareData).join('\n')}\n}\n`;
};
