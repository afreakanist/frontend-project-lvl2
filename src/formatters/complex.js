const indent = '    ';
// const getCorrectIndent = (x) => indent.repeat(x);

const formats = {
  added: ({ key, value } /* , depth */) => `${indent}+ ${key}: ${value}`,
  deleted: ({ key, value } /* , depth */) => `${indent}- ${key}: ${value}`,
  same: ({ key, value } /* , depth */) => `${indent}  ${key}: ${value}`,
  changed: ({ key, value1, value2 } /* , depth */) => `  - ${key}: ${value1}\n  + ${key}: ${value2}`,
  nested: ({ key, children } /* , depth */) => {
    const value = ['{', render(children), '}'].join('\n');
    return `${indent.repeat()}${key}: ${value}`;
  },
};

const render = (data /* , depth = 1 */) => data.map((el) => {
  const { type } = el;
  const visualise = formats[type];

  return visualise(el); /* , depth */
}).join('\n');

export default (data) => `{\n${render(data)}\n}`;
