import fs from 'fs';
import gendiff from '../src/index';

const correctOutput = fs.readFileSync('__tests__/__fixtures__/correctOutput.txt', 'utf-8');
const correctOutput2 = fs.readFileSync('__tests__/__fixtures__/correctOutput2.txt', 'utf-8');
const correctOutput3 = fs.readFileSync('__tests__/__fixtures__/correctOutput3.txt', 'utf-8');

describe('flat json comparison', () => {
  const first = '__tests__/__fixtures__/flatObject1.json';
  const second = '__tests__/__fixtures__/flatObject2.json';

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(correctOutput);
  });
});

describe('flat yaml comparison', () => {
  const first = '__tests__/__fixtures__/flatObject1.yml';
  const second = '__tests__/__fixtures__/flatObject2.yml';

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(correctOutput2);
  });
});

describe('flat ini comparison', () => {
  const first = '__tests__/__fixtures__/flatFile1.ini';
  const second = '__tests__/__fixtures__/flatFile2.ini';

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(correctOutput3);
  });
});
