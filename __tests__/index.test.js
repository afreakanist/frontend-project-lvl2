import fs from 'fs';
import gendiff from '../src/index';

const correctOutput = fs.readFileSync('__tests__/__fixtures__/correctOutput.txt', 'utf-8');
const correctOutput2 = fs.readFileSync('__tests__/__fixtures__/correctOutput2.txt', 'utf-8');

describe('json comparison', () => {
  const first = '__tests__/__fixtures__/flatObject1.json';
  const second = '__tests__/__fixtures__/flatObject2.json';

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(correctOutput);
  });
});

describe('yaml comparison', () => {
  const first = '__tests__/__fixtures__/flatObject1.yml';
  const second = '__tests__/__fixtures__/flatObject2.yml';

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(correctOutput2);
  });
});
