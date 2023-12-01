const {parse} = require("marked");

/**
 * 원본 html, 스캔용 html 분리해서 사용?
 * 객체 생성)
 * h1 스캔 -> 발견 시 처음 끝 체크 -> 원본 위치 기억, h2 스캔용 html 생성. 
 * 위 스캔용 html에서 h2 스캔 -> 발견 시 처음 끝 체크 -> h2 스캔용 html 원본 위치 기억, h3 스캔용 html 생성
 * 위 스캔용 html에서 h3 스캔 -> 발견 시 처음 끝 체크 -> h3 스캔용 html 원본 위치 기억, h4 스캔용 html 생성
 * 위 스캔용 html에서 h4 스캔 -> 발견 시 처음 끝 체크 -> h4 스캔용 html 원본 위치 기억, h5 스캔용 html 생성
 * 위 스캔용 html에서 h5 스캔 -> 발견 시 처음 끝 체크 -> h5 스캔용 html 원본 위치 기억, h6 스캔용 html 생성
 * 위 스캔용 html에서 h6 스캔 -> 발견 시 처음 끝 체크 -> h6 스캔용 html 원본 위치 기억
 */
class _MarkdownHeaderStructure {
    constructor(html) {
        const result = this.findHeader(html, 1);
        console.log(result);
    }

    findHeader(text, level, index) {
        const keyword = `<h${level}>`
        const start = text.indexOf(keyword, index);
        const end = text.indexOf(keyword, index);
        return [start, end];
    }
}

let markdown = null;

exports.parseMarkdownToHtml = (markdownText) => {
    const html = parse(markdownText);
    markdown = new _MarkdownHeaderStructure(html);

    return html;
}