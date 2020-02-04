#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows the difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(firstConfig, secondConfig));

program.parse(process.argv);
