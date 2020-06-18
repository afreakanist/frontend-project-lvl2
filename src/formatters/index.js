import getComplex from './complex';
import getJson from './json';
import getPlain from './plain';

const formatters = {
  json: getJson,
  complex: getComplex,
  plain: getPlain,
};

export default (data, format) => formatters[format](data);
