import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filepath) => {
  if (path.extname(filepath) === '.yml') {
    return yaml.safeLoad;
  }
  if (path.extname(filepath) === '.ini') {
    return ini.parse;
  }
  return JSON.parse;
};
