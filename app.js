const {parse} = require("marked");

exports.parseMarkdownToHtml = (markdownText) => {
    return parse(markdownText);
}