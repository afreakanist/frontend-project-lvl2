const valueTypes = {
  string: (value) => `'${value}'`,
  number: (value) => value,
  boolean: (value) => value,
  object: () => '[complex value]',
};

const getValue = (value) => valueTypes[typeof value](value);

const formats = {
  added: ({ key, value }) => `Property '${key}' was added with value: ${getValue(value)}`,
  deleted: ({ key }) => `Property '${key}' was deleted`,
  same: () => null,
  changed: ({ key, value1, value2 }) => `Property '${key}' was changed from ${getValue(value1)} to ${getValue(value2)}`,
  nested: ({ key, children }, func) => func(children, key),
};

const render = (data, ...keys) => data.map((el) => {
  const { key, type } = el;
  const getOutput = formats[type];
  const currKey = [...keys, key].join('.');

  return getOutput({ ...el, key: currKey }, render);
}).filter((el) => el !== null).join('\n');

export default render;
