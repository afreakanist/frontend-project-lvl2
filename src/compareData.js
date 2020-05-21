import { has, union, isObject } from 'lodash';

const compareData = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2));

  const difference = keys.map((key) => {
    if (!has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { key, type: 'nested', children: compareData(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    }

    return { key, type: 'same', value: obj1[key] };
  });

  return difference;
};

export default compareData;
