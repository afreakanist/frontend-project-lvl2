import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filepath1, filepath2) => {
  if (path.extname(filepath1) === path.extname(filepath2)) {
    if (path.extname(filepath1) === '.json') {
      return JSON.parse;
    }
    if (path.extname(filepath1) === '.yml') {
      return yaml.safeLoad;
    }
    if (path.extname(filepath1) === '.ini') {
      return ini.parse;
    }
  }

  return undefined;
};
