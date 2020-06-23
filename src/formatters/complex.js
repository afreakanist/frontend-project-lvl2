const indentStep = 4;
const getIndent = (depth) => ' '.repeat(depth * indentStep);
const getSignIndent = (depth) => ' '.repeat(depth * indentStep - 2);

const stringify = (key, value, depth) => {
  const startIndent = getSignIndent(depth);
  const endIndent = getIndent(depth);
  if (!(value instanceof Object)) {
    return [getSignIndent(depth), `${key}: ${value}`].join('');
  }

  const complexValue = Object.entries(value).map(([currKey, currValue]) => {
    if (currValue instanceof Object) {
      return stringify(currKey, currValue, depth + 1);
    }

    const currStartIndent = getIndent(depth + 1);
    return [currStartIndent, `${currKey}: ${currValue}`].join('');
  }).join('\n');

  return [`${startIndent}${key}: {`, complexValue, `${endIndent}}`].join('\n');
};

const formats = {
  added: ({ key, value }, depth) => stringify(`+ ${key}`, value, depth),
  deleted: ({ key, value }, depth) => stringify(`- ${key}`, value, depth),
  same: ({ key, value }, depth) => stringify(`  ${key}`, value, depth),
  changed: ({ key, value1, value2 }, depth) => (
    [stringify(`- ${key}`, value1, depth), stringify(`+ ${key}`, value2, depth)].join('\n')
  ),
  nested: ({ key, children }, depth, func) => {
    const value = ['{', func(children, depth + 1), `${getIndent(depth)}}`].join('\n');
    return stringify(`  ${key}`, value, depth);
  },
};

const render = (data, depth = 1) => data.map((el) => {
  const { type } = el;
  const getOutput = formats[type];

  return getOutput(el, depth, render);
}).join('\n');

export default (data) => `{\n${render(data)}\n}`;
