import fs from 'fs';
import gendiff from '../src';

const fixturesPath = '__tests__/__fixtures__/';
const complex = fs.readFileSync('__tests__/__fixtures__/complex.txt', 'utf-8').trim();
const json = fs.readFileSync('__tests__/__fixtures__/json.txt', 'utf-8').trim();
const plain = fs.readFileSync('__tests__/__fixtures__/plain.txt', 'utf-8').trim();

describe('tree comparison', () => {
  const first = `${fixturesPath}before.json`;
  const second = `${fixturesPath}after.json`;

  test('complex output', () => {
    expect(gendiff(first, second)).toEqual(complex);
  });

  test('JSON output', () => {
    expect(gendiff(first, second, 'json')).toEqual(json);
  });

  test('plain output', () => {
    expect(gendiff(first, second, 'plain')).toEqual(plain);
  });
});
