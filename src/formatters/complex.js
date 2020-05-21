const step = 2;
const getIndent = (depth) => '  '.repeat(step * depth);

const formats = {
  added: ({ key, value }, depth) => {
    const getIndentForAdded = () => {
      const arr = getIndent(depth).split('');
      arr[arr.length - 2] = '+';
      return arr.join('');
    };
    return `${getIndentForAdded()}${key}: ${value}`;
  },
  deleted: ({ key, value }, depth) => {
    const getIndentForDeleted = () => {
      const arr = getIndent(depth).split('');
      arr[arr.length - 2] = '-';
      return arr.join('');
    };
    return `${getIndentForDeleted()}${key}: ${value}`;
  },
  same: ({ key, value }, depth) => `${getIndent(depth)}${key}: ${value}`,
  changed: ({ key, value1, value2 }, depth) => {
    const getIndentForDeleted = () => {
      const arr = getIndent(depth).split('');
      arr[arr.length - 2] = '-';
      return arr.join('');
    };
    const getIndentForAdded = () => {
      const arr = getIndent(depth).split('');
      arr[arr.length - 2] = '+';
      return arr.join('');
    };
    return `${getIndentForDeleted()}${key}: ${value1}\n${getIndentForAdded()}${key}: ${value2}`;
  },
  nested: ({ key, children }, depth, func) => {
    const nestedDepth = depth + 1;
    const value = ['{', func(children, nestedDepth), '}'].join('\n');
    return `${getIndent(depth)}${key}: ${value}`;
  },
};

const render = (data, depth = 1) => data.map((el) => {
  const { type } = el;
  const getOutput = formats[type];

  return getOutput(el, depth, render);
}).join('\n');

export default (data) => `{\n${render(data)}\n}`;
