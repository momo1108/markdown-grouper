# markdown-grouper
package for grouping html parsed from markdown.

This package uses header for grouping.

You can set class or id for each group, so you can customize css or etc for each group.

## Installation
For use as a module:

```bash
npm install markdown-grouper
```

For use as a command line app:

```bash
npm install markdown-grouper -g
```

# Module Usage
## Functions
### Available functions
#### 🔹parseToGroup
parse markdown text to grouped html text.

#### 🔹parseFileToGroup
parse markdown file to grouped html text.

### Usage
```js
const { parseToGroup, parseFileToGroup } = require("markdown-grouper")

const md = `
# Title1
lorem ipsum

## Subtitle1
> test paragraph

### SubSubtitle
qwerty

## Subtitle2
hello world
`;

const groupedHtml = parseToGroup(md, 1);

const groupedHtmlFromFile = parseFileToGroup("./src/Hello.md", 1);

console.log(groupedHtml);
```

### result
```html
<section id="_h1-1">
  <h1>Title1</h1>
  <p>lorem ipsum</p>
  <section id="_h1-1_h2-1">
    <h2>Subtitle1</h2>
    <blockquote>
      <p>test paragraph</p>
    </blockquote>
    <section id="_h1-1_h2-1_h3-1">
      <h3>SubSubtitle</h3>
      <p>qwerty</p>
    </section>
  </section>
  <section id="_h1-1_h2-2">
    <h2>Subtitle2</h2>
    <p>hello world</p>
  </section>
</section>
```

### Params
#### 🔹parseToGroup

|Param|Type|Required|Description|
|---|---|---|---|
|markdownText|`string`|**YES**|Markdown text that you want to make group|
|minLevel|`1\|2\|3\|4\|5\|6`|*NO*|The smallest header number to start grouping.|
|selector|`string`|*NO*|Selector that you want to use between id and class.<br>(Possible values - All upper or lower cases of "class" and "id")|
|prefix|`string`|*NO*|prefix string of class or id.<br>( "_" -> \<section class="_h1-1"> )|
|postfix|`string`|*NO*|postfix string of class or id.<br>( "--" -> \<section class="_h1--1"> )|

#### 🔹parseFileToGroup

|Param|Type|Required|Description|
|---|---|---|---|
|markdownPath|`string`|**YES**|Path of Markdown file that you want to make group|
|minLevel|`1\|2\|3\|4\|5\|6`|*NO*|The smallest header number to start grouping.|
|selector|`string`|*NO*|Selector that you want to use between id and class.<br>(Possible values - All upper or lower cases of "class" and "id")|
|prefix|`string`|*NO*|prefix string of class or id.<br>( "_" -> \<section class="_h1-1"> )|
|postfix|`string`|*NO*|postfix string of class or id.<br>( "--" -> \<section class="_h1--1"> )|

<br>
<br>

---

<br>
<br>

## Class
### Description
You can import two below.

#### 🔹markdownDoc
Instance of Class `MarkdownDocument`. Automatically initialized when you use `parseToGroup` or `parseFileToGroup` function.

#### 🔹MarkdownDocument
Class that contains information about markdown text of file. You can create Instance with empty constuctor and initialize it with `setDocument` method. You can use two properties and two methods.

##### Properties
- `markdown` : string from original markdown text or file.
- `html` : string result of grouped html from markdown text or file.

##### Methods
- `setDocument` : Set the value of MarkdownDocument. Use this method first after create instance. Then you can use other properties and methods.

|Param|Type|Required|Description|
|---|---|---|---|
|isPath|`boolean`|**YES**|`true` if you want to use markdown file, `false` to use markdown text|
|markdownText|`string`|**YES**|Path of markdown file or string of markdown text|
|minLevel|`1\|2\|3\|4\|5\|6`|*NO*|The smallest header number to start grouping. Default value is `1`|
|order|`number`|*NO*|Smallest number of header tag that you want to start grouping. Default value is `1`(1 -> from h1 to h6, 2 -> from h2 to h6, ...)|
|prevLabel|`string`|*NO*|Starting text of class or id of header tag. Default value is `""`|
|selector|`string`|*NO*|Selector that you want to use between id and class. Default value is `"id"`<br>(Possible values - All upper or lower cases of "class" and "id")|
|prefix|`string`|*NO*|Prefix string of class or id. Default value is `"_"`<br>( "_" -> \<section class="_h1-1"> )|
|postfix|`string`|*NO*|Postfix string of class or id. Default value is `"-"`<br>( "--" -> \<section class="_h1--1"> )|

- `showHeaderTree` : Print and return the string of header structure in a tree form.

### Usage
```js
const { parseToGroup, markdownDoc, MarkdownDocument } = require("markdown-grouper")

const md = `
# Title1
lorem ipsum

## Subtitle1
> test paragraph

### SubSubtitle
qwerty

## Subtitle2
hello world
`;

const groupedHtml = parseToGroup(md, 1);
console.log(groupedHtml);

console.log(markdownDoc.html);
markdownDoc.showHeaderTree();

const markdownDoc2 = new MarkdownDocument();
markdownDoc2.setDocument(false, md);

console.log(markdownDoc2.html);
markdownDoc2.showHeaderTree();
```

### result
```html
<section id="_h1-1">
  <h1>Title1</h1>
  <p>lorem ipsum</p>
  <section id="_h1-1_h2-1">
    <h2>Subtitle1</h2>
    <blockquote>
      <p>test paragraph</p>
    </blockquote>
    <section id="_h1-1_h2-1_h3-1">
      <h3>SubSubtitle</h3>
      <p>qwerty</p>
    </section>
  </section>
  <section id="_h1-1_h2-2">
    <h2>Subtitle2</h2>
    <p>hello world</p>
  </section>
</section>

<section id="_h1-1">
  <h1>Title1</h1>
  <p>lorem ipsum</p>
  <section id="_h1-1_h2-1">
    <h2>Subtitle1</h2>
    <blockquote>
      <p>test paragraph</p>
    </blockquote>
    <section id="_h1-1_h2-1_h3-1">
      <h3>SubSubtitle</h3>
      <p>qwerty</p>
    </section>
  </section>
  <section id="_h1-1_h2-2">
    <h2>Subtitle2</h2>
    <p>hello world</p>
  </section>
</section>

<h1>Title1</h1>
  ├<h2>Subtitle1</h2>
  │  └<h3>SubSubtitle</h3>
  └<h2>Subtitle2</h2>




<section id="_h1-1">
  <h1>Title1</h1>
  <p>lorem ipsum</p>
  <section id="_h1-1_h2-1">
    <h2>Subtitle1</h2>
    <blockquote>
      <p>test paragraph</p>
    </blockquote>
    <section id="_h1-1_h2-1_h3-1">
      <h3>SubSubtitle</h3>
      <p>qwerty</p>
    </section>
  </section>
  <section id="_h1-1_h2-2">
    <h2>Subtitle2</h2>
    <p>hello world</p>
  </section>
</section>

<h1>Title1</h1>
  ├<h2>Subtitle1</h2>
  │  └<h3>SubSubtitle</h3>
  └<h2>Subtitle2</h2>
```

<br>
<br>
<br>
<br>

---

<br>
<br>
<br>
<br>

# CLI Usage
## Basic Usage
```
Usage: mdg [options] [command]

CLI parse markdown file into html grouped with <section> tag based on header.

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  parse [options] <path>  Parse a markdown file into html grouped with <section> tag based on header.
  tree <path>             Show a tree structure of markdown file based on header.
  help [command]          display help for command
```

## Commands
### parse
Parse a markdown file into html grouped with `<section>` tag based on header.

You can save the result with `-s` and `-p` options.

```
Usage: mdg parse [options] <path>
Example: mdg parse ./test.md -s -p ./src/result.html

Arguments:
  path               Path to your markdown file.
                     ex) ./posts/hello.md

Options:
  -s, --save         Use if you want to save result. Don't use if you want to print result.
  -p, --path <path>  Path to save html file that is parsed from markdown file.
                     You should use this with save option(-s, --save).
  -h, --help         display help for command
```

### tree
Show a tree structure of markdown file based on header.

```
Usage: mdg tree [options] <path>
Example: mdg tree ./test.md

Arguments:
  path        Path to your markdown file.
              ex) ./posts/hello.md

Options:
  -h, --help  display help for command
```