const step = 2;
const getIndent = (depth) => ' '.repeat(step * depth);

const getString = (key, value, depth) => {
  const startIndent = getIndent(depth);
  const endIndent = getIndent(depth + 1);
  if (!(value instanceof Object)) {
    return [getIndent(depth), `${key}: ${value}`].join('');
  }

  const complexValue = Object.entries(value).map(([currKey, currValue]) => {
    if (currValue instanceof Object) {
      return getString(currKey, currValue, depth + 3);
    }

    const currStartIndent = getIndent(depth + 3);
    return [currStartIndent, `${currKey}: ${currValue}`].join('');
  }).join('\n');

  return [`${startIndent}${key}: {`, complexValue, `${endIndent}}`].join('\n');
};

const formats = {
  added: ({ key, value }, depth) => getString(`+ ${key}`, value, depth),
  deleted: ({ key, value }, depth) => getString(`- ${key}`, value, depth),
  same: ({ key, value }, depth) => getString(`  ${key}`, value, depth),
  changed: ({ key, value1, value2 }, depth) => (
    [getString(`- ${key}`, value1, depth), getString(`+ ${key}`, value2, depth)].join('\n')
  ),
  nested: ({ key, children }, depth, func) => {
    const value = ['{', func(children, depth + 2), `${getIndent(depth + 1)}}`].join('\n');
    return getString(`  ${key}`, value, depth);
  },
};

const render = (data, depth = 1) => data.map((el) => {
  const { type } = el;
  const getOutput = formats[type];

  return getOutput(el, depth, render);
}).join('\n');

export default (data) => `{\n${render(data)}\n}`;
