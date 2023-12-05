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
    #headerInfo = [];

    constructor(html) {
        const result = this.findHeader(html, 1, 0, "");
        console.log(result);
    }

    // start는 레벨에 맞는 모든 헤더태그 찾기
    // end는 해당 레벨 이상의 모든 태그 찾기
    // 함수 내부에서 현재 레벨에 해당하는 모든 태그를 체크해야함. while문 사용하고 반복시마다 이전태그 다음으로 index 이동
    findHeader(text, level, order, prevLabel) {
        if(level > 6) return text;

        const startPattern =  new RegExp(`<h${level}>.+</h${level}>`, "g")
        const endPattern = new RegExp(`<h[${Array.from(Array(level), (_, index)=>index+1).join("")}]>`, "g");

        let start = startPattern.exec(text);

        // 처음 해당 레벨이 존재하는가?
        if(start){
            let endCheck = endPattern.exec(text.slice(start.index+4));
            let end = endCheck? endCheck.index : text.length;
        
            let textBeforeStart, textFromStartToEnd, textAfterEnd;
        
            while(start) {
                if(order===0){
                    textBeforeStart = text.slice(0, start.index);
                    textFromStartToEnd = text.slice(start.index, end);
                    textAfterEnd = text.slice(end);
                } else {
                    textBeforeStart = textAfterEnd.slice(0, start.index);
                    textFromStartToEnd = textAfterEnd.slice(start.index, end);
                    textAfterEnd = textAfterEnd.slice(end);
                }
        
                const curLabel = `${prevLabel}_h${level}-${order}`;
                const content = findHeader(textFromStartToEnd, level+1, 0, curLabel);
        
                if(order===0){
                    text = `${textBeforeStart}
<section id="${curLabel}">
${content}
</section>`
                } else {
                    text = `${text}
${textBeforeStart}
<section id="${curLabel}">
${content}
</section>`
                }
        
                order++;
                start = startPattern.exec(textAfterEnd);
                endCheck = endPattern.exec(textAfterEnd.slice(start+4));
                end = endCheck? endCheck.index : text.length;
            }
        
            text = `${text}
${textAfterEnd}`;
        } else {
            text = findHeader(text, level+1, 0, "");
        }

        return text;
    }
}

let markdown = null;

exports.parseMarkdownToHtml = (markdownText) => {
    const html = parse(markdownText);
    markdown = new _MarkdownHeaderStructure(html);

    return html;
}