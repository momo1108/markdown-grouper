const {parse} = require("marked");
const prettify = require("html-prettify");
const fs = require("fs");

function encodeHeaderTag(markdownText){
    for(let level = 1; level < 7; level++){
        const startPattern = new RegExp(`<h${level}`, "g");
        const endPattern = new RegExp(`</h${level}`, "g");

        markdownText = markdownText.replaceAll(startPattern, `MDGMDGMDGHEADER${level}MDGMDGMDGSTART`);
        markdownText = markdownText.replaceAll(endPattern, `MDGMDGMDGHEADER${level}MDGMDGMDGEND`);
    }

    return markdownText;
}

function decodeHeaderTag(markdownText){
    for(let level = 1; level < 7; level++){
        const startPattern = new RegExp(`MDGMDGMDGHEADER${level}MDGMDGMDGSTART`, "g");
        const endPattern = new RegExp(`MDGMDGMDGHEADER${level}MDGMDGMDGEND`, "g");

        markdownText = markdownText.replaceAll(startPattern, `&lt;h${level}`);
        markdownText = markdownText.replaceAll(endPattern, `&lt;/h${level}`);
    }

    return markdownText;
}

function findHeader(text, level, order, prevLabel) {
    if(level > 6) return text;

    const levelString = Array.from(Array(level), (_, index)=>index+1).join("");

    try {
        let start = new RegExp(`<h${level}>.+</h${level}>`, "g").exec(text);
    
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
                end = endCheck? start.index + endCheck.index + 4 : textAfterEnd.length;
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

/**
 * parse Markdown Text to Grouped Html text.
 * @param {string} markdownText text data written in markdown syntax
 * @param {number} minLevel min level to start grouping
 * @returns {string} html text data grouped by section tag
 */
exports.parseToGroup = (markdownText, minLevel=1) => {
    markdownText = encodeHeaderTag(markdownText);
    const html = parse(markdownText);
    const resultBeforeDecode = prettify(findHeader(html, minLevel, 1, ""));
    const result = decodeHeaderTag(resultBeforeDecode);

    return result;
}

/**
 * parse Markdown File to Grouped Html text.
 * @param {string} markdownPath path string of markdown file
 * @param {number} minLevel min level to start grouping
 * @returns {string} html text data grouped by section tag
 */
exports.parseFileToGroup = (markdownPath, minLevel=1) => {
    try {
        let markdownData = fs.readFileSync(markdownPath).toString();
        markdownData = encodeHeaderTag(markdownData);
        const html = parse(markdownData);
        const resultBeforeDecode = findHeader(html, minLevel, 1, "");
        const result = decodeHeaderTag(resultBeforeDecode);
        
        return result;
    } catch(error) {
        console.error(error);

        return null;
    }
}