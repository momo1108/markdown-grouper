const {parse} = require("marked");
const prettify = require("@liquify/prettify");
const fs = require("fs");

class HeaderComponent {
    #level = 1;
    #innerText = "";
    #children = [];

    constructor(level, innerText){
        this.#level = level;
        this.#innerText = innerText;
    }
    
    pushChild(childComponent){
        this.#children.push(childComponent);
    }

    get level(){
        return this.#level;
    }

    get innerText(){
        return this.#innerText;
    }

    get children(){
        return this.#children;
    }
}

class MarkdownDocument {
    #roots = []; // 최상위 헤더태그들을 저장.
    #markdown = "";
    #html = "";

    constructor(){}

    setDocument(markdownText, minLevel=1, order=1, prevLabel="", selector="id", prefix="_", postfix="-"){
        this.#markdown = markdownText;
        markdownText = this.encodeHeaderTag(markdownText);
        const html = parse(markdownText);
        const resultBeforeDecode = prettify.formatSync(this.findHeader(html, minLevel, order, prevLabel, selector, prefix, postfix, null), {
            language: 'html',
            indentSize: 2
        });
        this.#html = prettify.formatSync(this.decodeHeaderTag(resultBeforeDecode), {
            language: 'html',
            indentSize: 2
        });
    }

    get roots(){
        return this.#roots;
    }

    get markdown(){
        return this.#markdown;
    }

    get html(){
        return this.#html;
    }

    showHeaderTree(){
        let totalHeaderText = "";

        for(let i = 0; i < this.#roots.length; i++){
            totalHeaderText += this.treeSearch(this.#roots[i], 0, 1);
        }

        console.log(totalHeaderText);

        return totalHeaderText;
    }

    treeSearch(headerComponent, depth, isEnd){
        // console.log(headerComponent.innerText, depth, isEnd);
        let headerText = `${"  ".repeat(depth)}${depth>0?isEnd?"└":"├":""}${headerComponent.innerText}\n`;

        for(let child = 0; child < headerComponent.children.length; child++){
            let childText = this.treeSearch(headerComponent.children[child], depth + 1, child === (headerComponent.children.length - 1));
            headerText += childText;
        }

        return headerText;
    }

    encodeHeaderTag(markdownText){
        for(let level = 1; level < 7; level++){
            const startPattern = new RegExp(`<h${level}`, "g");
            const endPattern = new RegExp(`</h${level}`, "g");
    
            markdownText = markdownText.replaceAll(startPattern, `MDGMDGMDGHEADER${level}MDGMDGMDGSTART`);
            markdownText = markdownText.replaceAll(endPattern, `MDGMDGMDGHEADER${level}MDGMDGMDGEND`);
        }
    
        return markdownText;
    }
    
    decodeHeaderTag(markdownText){
        for(let level = 1; level < 7; level++){
            const startPattern = new RegExp(`MDGMDGMDGHEADER${level}MDGMDGMDGSTART`, "g");
            const endPattern = new RegExp(`MDGMDGMDGHEADER${level}MDGMDGMDGEND`, "g");
    
            markdownText = markdownText.replaceAll(startPattern, `&lt;h${level}`);
            markdownText = markdownText.replaceAll(endPattern, `&lt;/h${level}`);
        }
    
        return markdownText;
    }
    
    findHeader(text, level, order, prevLabel, selector, prefix, postfix, parent) {
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

                    // 여기에 childComponent 생성?
                    const headerComponent = new HeaderComponent(level, start[0]);
                    
                    if(parent){
                        parent.pushChild(headerComponent);
                    } else {
                        this.#roots.push(headerComponent);
                    }
            
                    const curLabel = `${prevLabel}${prefix}h${level}${postfix}${order}`;
                    const content = this.findHeader(textFromStartToEnd, level+1, 1, curLabel, selector, prefix, postfix, headerComponent);
            
                    if(order===1){
                        text = `${textBeforeStart}<section ${selector}="${curLabel}">
${content}</section>`
                    } else {
                        text = `${text}
${textBeforeStart}<section ${selector}="${curLabel}">
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
                text = findHeader(text, level+1, 1, prevLabel, selector, prefix, postfix, parent);
            }
    
        } catch(error){
            console.log("%%%%%%ERROR%%%%%");
            console.log(minLevel, order, error);
        }
    
        return text;
    }
}

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

function findHeader(text, level, order, prevLabel, selector, prefix, postfix) {
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
        
                const curLabel = `${prevLabel}${prefix}h${level}${postfix}${order}`;
                const content = findHeader(textFromStartToEnd, level+1, 1, curLabel, selector, prefix, postfix);
        
                if(order===1){
                    text = `${textBeforeStart}<section ${selector}="${curLabel}">
${content}</section>`
                } else {
                    text = `${text}
${textBeforeStart}<section ${selector}="${curLabel}">
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
            text = findHeader(text, level+1, 1, prevLabel, selector, prefix, postfix);
        }

    } catch(error){
        console.log("%%%%%%ERROR%%%%%");
        console.log(level, order, error);
    }

    return text;
}


/**
 * MarkdownDocument Object
 */
exports.markdownDocument = new MarkdownDocument();

/**
 * parse Markdown Text to Grouped Html text.
 * @param {string} markdownText text data written in markdown syntax
 * @param {number} minLevel min level to start grouping
 * @param {string} selector Selector that you want to use between id and class.(Possible values - All upper or lower cases of "class" and "id")
 * @param {string} prefix prefix string of class or id.( "_" -> \<section class="_h1-1"> )
 * @param {string} postfix postfix string of class or id.( "--" -> \<section class="_h1--1"> )
 * @returns {string} html text data grouped by section tag
 */
exports.parseToGroup = (markdownText, minLevel=1, selector="id", prefix="_", postfix="-") => {
    selector = selector.toLowerCase();
    if(!["id", "class"].includes(selector.toLowerCase())) {
        throw new Error(`"${selector}" is invalid name for a selector.`);
    }

    if(!exports.markdownDocument) {
        exports.markdownDocument = new MarkdownDocument();
    }

    exports.markdownDocument.setDocument(markdownText, minLevel, 1, "", selector, prefix, postfix);

    markdownText = encodeHeaderTag(markdownText);
    const html = parse(markdownText);
    const resultBeforeDecode = prettify.formatSync(findHeader(html, minLevel, 1, "", selector, prefix, postfix), {
        language: 'html',
        indentSize: 2
      });
    const result = prettify.formatSync(decodeHeaderTag(resultBeforeDecode), {
        language: 'html',
        indentSize: 2
      });

    return result;
}

/**
 * parse Markdown File to Grouped Html text.
 * @param {string} markdownPath path string of markdown file
 * @param {number} minLevel min level to start grouping
 * @param {string} selector Selector that you want to use between id and class.(Possible values - All upper or lower cases of "class" and "id")
 * @param {string} prefix prefix string of class or id.( "_" -> \<section class="_h1-1"> )
 * @param {string} postfix postfix string of class or id.( "--" -> \<section class="_h1--1"> )
 * @returns {string} html text data grouped by section tag
 */
exports.parseFileToGroup = (markdownPath, minLevel=1, selector="id", prefix="_", postfix="-") => {
    selector = selector.toLowerCase();
    if(!["id", "class"].includes(selector)) {
        throw new Error(`"${selector}" is invalid name for a selector.`);
    }

    if(!exports.markdownDocument) {
        exports.markdownDocument = new MarkdownDocument();
    }
    
    let markdownText = fs.readFileSync(markdownPath).toString();
    
    exports.markdownDocument.setDocument(markdownText, minLevel, 1, "", selector, prefix, postfix);

    markdownText = encodeHeaderTag(markdownText);
    const html = parse(markdownText);
    const resultBeforeDecode = findHeader(html, minLevel, 1, "", selector, prefix, postfix);
    const result = prettify.formatSync(decodeHeaderTag(resultBeforeDecode), {
        language: 'html',
        indentSize: 2
      });
    
    return result;
}