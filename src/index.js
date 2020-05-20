import fs from 'fs';
import path from 'path';
import parse from './parsers';
import compareData from './compareData';
import formatter from './formatters/main';

const getContent = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

export default (file1, file2, format = 'complex') => {
  const obj1 = parse(file1)(getContent(file1));
  const obj2 = parse(file2)(getContent(file2));

  const difference = compareData(obj1, obj2);

  return formatter(difference, format);
};
