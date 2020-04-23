import fs from 'fs';
import gendiff from '../src/index';

const fixturesPath = '__tests__/__fixtures__/';
const flatCorrectOutput = fs.readFileSync('__tests__/__fixtures__/flatCorrectOutput.txt', 'utf-8').trim();
const treeCorrectOutput = fs.readFileSync('__tests__/__fixtures__/treeCorrectOutput.txt', 'utf-8').trim();

describe('flat json comparison', () => {
  const first = `${fixturesPath}flat1.json`;
  const second = `${fixturesPath}flat2.json`;

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(flatCorrectOutput);
  });
});

describe('flat yaml comparison', () => {
  const first = `${fixturesPath}flat1.yml`;
  const second = `${fixturesPath}flat2.yml`;

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(flatCorrectOutput);
  });
});

describe('flat ini comparison', () => {
  const first = `${fixturesPath}flat1.ini`;
  const second = `${fixturesPath}flat2.ini`;

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(flatCorrectOutput);
  });
});

describe('tree json comparison', () => {
  const first = `${fixturesPath}tree1.json`;
  const second = `${fixturesPath}tree2.json`;

  test('running gives the correct output', () => {
    expect(gendiff(first, second)).toEqual(treeCorrectOutput);
  });
});
