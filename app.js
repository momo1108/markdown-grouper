const {parse} = require("marked");
const prettify = require("html-prettify");

function findHeader(text, level, order, prevLabel) {
    if(level > 6) return text;

    const levelString = Array.from(Array(level), (_, index)=>index+1).join("");

    try {
        let start = new RegExp(`<h${level}>.+</h${level}>`, "g").exec(text);
    
        // 처음 해당 레벨이 존재하는가?
        if(start){
            let endCheck = new RegExp(`<h[${levelString}]>.+</h[${levelString}]>`, "g").exec(text.slice(start.index + 4));
            let end = endCheck? start.index + endCheck.index + 4 : text.length;
        
            let textBeforeStart, textFromStartToEnd, textAfterEnd;
        
            while(start) {
                if(order===1){
                    textBeforeStart = text.slice(0, start.index);
                    textFromStartToEnd = text.slice(start.index, end);
                    textAfterEnd = text.slice(end);
                } else {
                    textBeforeStart = textAfterEnd.slice(0, start.index);
                    textFromStartToEnd = textAfterEnd.slice(start.index, end);
                    textAfterEnd = textAfterEnd.slice(end);
                }
    
                // console.log("===============", level, order, prevLabel, "================");
                // console.log("before)\n",textBeforeStart,"\n");
                // console.log("between)\n",textFromStartToEnd,"\n");
                // console.log("after)\n",textAfterEnd,"\n");
                // console.log(start);
                // console.log(endCheck);
        
                const curLabel = `${prevLabel}_h${level}-${order}`;
                const content = findHeader(textFromStartToEnd, level+1, 1, curLabel);
        
                if(order===1){
                    text = `${textBeforeStart}<section id="${curLabel}">
${content}</section>`
                } else {
                    text = `${text}
${textBeforeStart}<section id="${curLabel}">
${content}</section>`
                }
        
                order++;
                start = new RegExp(`<h${level}>.+</h${level}>`, "g").exec(textAfterEnd);
                endCheck = start?new RegExp(`<h[${levelString}]>.+</h[${levelString}]>`, "g").exec(textAfterEnd.slice(start.index+4)):null;
                end = endCheck? endCheck.index : text.length;
            }
        
            text = `${text}
    ${textAfterEnd}`;
        } else {
            text = findHeader(text, level+1, 1, prevLabel);
        }

    } catch(error){
        console.log("%%%%%%ERROR%%%%%");
        console.log(level, order, error);
    }

    return text;
}

exports.parseToGroup = (markdownText, minLevel=1) => {
    const html = parse(markdownText);
    const result = prettify(findHeader(html, minLevel, 1, ""));

    return result;
}