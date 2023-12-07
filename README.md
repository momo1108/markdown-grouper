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
```

## Params
|Param|Type|Required|Description|
|---|---|---|---|
|markdownText|`string`|YES|Markdown text that you want to make group|
|minLevel|`number`|NO|The smallest header number to start grouping.|