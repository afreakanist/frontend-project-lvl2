const step = 2;
const getIndent = (depth) => '  '.repeat(step * depth);

const getIndentWithSign = (type, depth) => {
  const arr = getIndent(depth).split('');
  arr[arr.length - 2] = (type === 'added') ? '+' : '-';
  return arr.join('');
};

const formats = {
  added: ({ key, value }, depth) => `${getIndentWithSign('added', depth)}${key}: ${value}`,
  deleted: ({ key, value }, depth) => `${getIndentWithSign('deleted', depth)}${key}: ${value}`,
  same: ({ key, value }, depth) => `${getIndent(depth)}${key}: ${value}`,
  changed: ({ key, value1, value2 }, depth) => `${getIndentWithSign('deleted', depth)}${key}: ${value1}\n${getIndentWithSign('added', depth)}${key}: ${value2}`, // одно из значений -- объект => ?
  nested: ({ key, children }, depth, func) => {
    const value = ['{', func(children, depth + 1), `${getIndent(depth)}}`].join('\n');
    return `${getIndent(depth)}${key}: ${value}`;
  },
};

const render = (data, depth = 1) => data.map((el) => {
  const { type } = el;
  const getOutput = formats[type];

  return getOutput(el, depth, render);
}).join('\n');

export default (data) => `{\n${render(data)}\n}`;
