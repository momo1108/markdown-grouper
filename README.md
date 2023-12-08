# markdown-grouper
package for grouping html parsed from markdown.

This package uses header for grouping.

You can set class or id for each group, so you can customize css or etc for each group.

## Usage
```js
const { parseToGroup } = require("markdown-grouper")

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
```

## result
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

## Params
- parseToGroup

|Param|Type|Required|Description|
|---|---|---|---|
|markdownText|`string`|YES|Markdown text that you want to make group|
|minLevel|`number`|NO|The smallest header number to start grouping.|

- parseFileToGroup

|Param|Type|Required|Description|
|---|---|---|---|
|markdownPath|`string`|YES|Path of Markdown file that you want to make group|
|minLevel|`number`|NO|The smallest header number to start grouping.|