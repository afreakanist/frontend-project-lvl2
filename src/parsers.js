import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  if (path.extname(filepath) === '.json') {
    return JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf8'));
  }
  if (path.extname(filepath) === '.yml') {
    return yaml.safeLoad(fs.readFileSync(path.resolve(filepath), 'utf8'));
  }
};
