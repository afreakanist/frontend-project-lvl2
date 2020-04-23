import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const getContent = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf8');
const getObject = (file1, file2, content) => getParser(file1, file2)(content);
const getKeys = (obj1, obj2) => (_.union(Object.keys(obj1), Object.keys(obj2)));

const compareData = (key, obj1, obj2) => {
  let str;
  if (_.has(obj1, key) && _.has(obj2, key)) {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      str = `    ${key}: ${gendiff(getKeys(obj1[key], obj2[key]), obj1[key], obj2[key])}`;
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      str = `    ${key}: ${obj1[key]}`;
    }
    if (!_.isObject(obj1[key]) && !_.isObject(obj2[key]) && !_.isEqual(obj1[key], obj2[key])) {
      str = `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
    }
  }
  if (!_.has(obj1, key) && _.has(obj2, key)) {
    str = `  + ${key}: ${obj2[key]}`;
  }
  if (_.has(obj1, key) && !_.has(obj2, key)) {
    str = `  - ${key}: ${obj1[key]}`;
  }

  return str;
};

const gendiff = (keys, obj1, obj2) => (`{\n${keys.map((key) => compareData(key, obj1, obj2)).join('\n')}\n}`);

export default (file1, file2) => {
  const obj1 = getObject(file1, file2, getContent(file1));
  const obj2 = getObject(file1, file2, getContent(file2));
  return gendiff(getKeys(obj1, obj2), obj1, obj2);
};
