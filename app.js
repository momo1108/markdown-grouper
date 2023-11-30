const {parse} = require("marked");

/**
 * Header 구조 출력
 * Header 구조 별 클래스 or 아이디 설정
 */
class _MarkdownHeaderStructure {
    #h1 = 0;
    #h2 = 0;
    #h3 = 0;
    #h4 = 0;
    #h5 = 0;

    constructor(html) {
        
    }
}

let markdown = null;

exports.parseMarkdownToHtml = (markdownText) => {
    const html = parse(markdownText);
    const template = document.createElement("template");
    template.innerHTML = html;
    const result = template.content.children;
    console.log(result);
    markdown = _MarkdownHeaderStructure(html);

    return html;
}