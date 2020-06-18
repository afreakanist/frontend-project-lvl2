import fs from 'fs';
import path from 'path';
import parse from './parsers';
import compareData from './compareData';
import getOutput from './formatters/index';

const getType = (filepath) => path.extname(filepath).slice(1);

const getContent = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

export default (filepath1, filepath2, format = 'complex') => {
  const obj1 = parse(getType(filepath1))(getContent(filepath1));
  const obj2 = parse(getType(filepath2))(getContent(filepath2));

  const difference = compareData(obj1, obj2);

  return getOutput(difference, format);
};
