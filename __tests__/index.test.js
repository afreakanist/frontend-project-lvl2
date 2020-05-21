import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const fileFormats = ['ini', 'json', 'yml'];
const outputFormats = ['complex', 'json', 'plain'];

const argSets = outputFormats.map((outputFormat) => (
  fileFormats.map((fileFormat) => [fileFormat, outputFormat])
)).flat(); // ?!

test.each(argSets)('show difference between %s files in %s format', (fileFormat, outputFormat) => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const before = getFixturePath(`before.${fileFormat}`);
  const after = getFixturePath(`after.${fileFormat}`);
  const correctOutput = fs.readFileSync(getFixturePath(outputFormat), 'utf-8');
  expect(gendiff(before, after, outputFormat)).toEqual(correctOutput);
});
