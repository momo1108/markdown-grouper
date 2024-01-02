#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import {MarkdownDocument} from "../lib/main.mjs";
import fs from "fs";
import path from "path";

const program = new Command();

program
  .name(chalk.blue('mdg'))
  .description(chalk.green('CLI parse markdown file into html grouped with <section> tag based on header.'))
  .version(`${chalk.gray('Installed Version : ')}${chalk.blue('v1.5.3')}`);

program.command('parse')
  .description('Parse a markdown file into html grouped with <section> tag based on header.')
  .argument('<path>', 'Path to your markdown file. \nex) ./posts/hello.md')
  .option('-s, --save', 'Path to save html file that is parsed from markdown file.\nDefault value : Same with the name of markdown file')
  .option('-p, --path <path>', 'Path to save html file that is parsed from markdown file.\nDefault value : Same with the name of markdown file')
  .action((arg, options) => {
    try {
      console.log(options);

      const fileName = path.basename(arg, ".md");

      if(path.extname(arg)!==".md") {
        throw new Error("You should input a path of '.md' file.");
      }
      
      const md = new MarkdownDocument();
      md.setDocument(true, arg, 1, 1, "", "id", "_", "-", true);

      if (options.save) {
        // path는 사용자에게 confirm 받아야할듯.
        if(options.path){
          if(path.extname(options.path)===".html"){
            fs.writeFileSync(options.path, md.html);
          } else {
            
          }
        } else {
          fs.writeFileSync(`${fileName}.html`, md.html);
        }
      } else {
        console.log(chalk.blue(md.html));
      }
      
    } catch(error){
      console.error(chalk.red(error.stack));
    }
  });

program.command('tree')
  .description('Show a tree structure of markdown file based on header.')
  .argument('<path>', 'Path to your markdown file. \nex) ./posts/hello.md')
  .action((arg, options) => {
    try {
      const md = new MarkdownDocument();
      md.setDocument(true, arg, 1, 1, "", "id", "_", "-", true);
      md.showHeaderTree();
    } catch(error){
      console.error(chalk.red(error.stack));
    }
  });

program.parse();