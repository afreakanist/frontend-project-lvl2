#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows the difference.')
  .version('1.0.0');

program.parse(process.argv);
