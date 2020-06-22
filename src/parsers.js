import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  ini: ini.parse,
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (type) => parsers[type];
