const valueTypes = {
  number: (value) => `'${value}'`,
  string: (value) => value,
  boolean: (value) => value,
  object: (value) => '[complex value]',
};

const getValue = (value) => valueTypes[typeof value](value);

const formats = {
  added: ({ key, value }) => `Property ${key} was added with value: ${getValue(value)}`,
  deleted: ({ key, value }) => `Property ${key} was deleted`,
  same: ({ key, value }) => null,
  changed: ({ key, value1, value2 }) => `Property ${key} was changed from ${getValue(value1)} to ${getValue(value2)}`,
  nested: ({ key, children }) => render(children),
};

const render = (data) => data.map((el) => {
  const { type } = el;
  const visualise = formats[type];

  return visualise(el);
}).join('\n');

export default render;
