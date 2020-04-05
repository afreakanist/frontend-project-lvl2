import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (first, second) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(first), 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(second), 'utf8'));
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

  return `{\n${keys.map(compareData).join('\n')}\n}`;
};
