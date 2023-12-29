#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import mdg from "../lib/main.js";

const program = new Command();

program
  .name('markdown-grouper')
  .description('CLI parse markdown file into html grouped with <section> tag based on header.')
  .version('1.5.3');

program.command('parse')
  .description('Parse a markdown file into html grouped with <section> tag based on header.')
  .argument('<path>', 'Path to your markdown file. \nex) ./posts/hello.md')
  .option('-n, --name <string>', 'Name of html file that is parsed from markdown file', 'Same with the name of markdown file')
  .action((str, options) => {
    console.log(str);
    console.log(options);
  });

program.command('tree')
  .description('Show a tree structure of markdown file based on header.')
  .argument('<path>', 'Path to your markdown file. \nex) ./posts/hello.md')
  .action((str, options) => {
    console.log(str);
    console.log(options);
  });

program.parse();