/**
 * parse Markdown Text to Grouped Html text.
 * @param {string} markdownText text data written in markdown syntax
 * @param {number} minLevel min level to start grouping
 * @param {string} selector Selector that you want to use between id and class.(Possible values - All upper or lower cases of "class" and "id")
 * @param {string} prefix prefix string of class or id.( "_" -> \<section class="_h1-1"> )
 * @param {string} postfix postfix string of class or id.( "--" -> \<section class="_h1--1"> )
 * @returns {string} html text data grouped by section tag
 */
declare function parseToGroup(markdownText:string, minLevel?:1|2|3|4|5|6, selector?:string, prefix?:string, postfix?:string): string;

/**
 * parse Markdown File to Grouped Html text.
 * @param {string} markdownPath path string of markdown file
 * @param {number} minLevel min level to start grouping
 * @param {string} selector Selector that you want to use between id and class.(Possible values - All upper or lower cases of "class" and "id")
 * @param {string} prefix prefix string of class or id.( "_" -> \<section class="_h1-1"> )
 * @param {string} postfix postfix string of class or id.( "--" -> \<section class="_h1--1"> )
 * @returns {string} html text data grouped by section tag
 */
declare function parseFileToGroup(markdownPath:string, minLevel?:1|2|3|4|5|6, selector?:string, prefix?:string, postfix?:string): string;

/**
 * Class of Markdown Document.
 * Use setDocument method after create instance with empty constructor.
 * @property {string} markdown text copied from markdown file or text.
 * @property {string} html html string that is parsed from markdown file or text.
 * @method setDocument set the content of markdown document instead of constructor
 * @method showHeaderTree print and return the string of tree structure made from header.
 */
declare class MarkdownDocument {
    private _markdown:string;
    private _html:string;

    /**
     * set the content of markdown document instead of constructor
     * @param isPath `true` if you want to use markdown file, `false` to use markdown text
     * @param markdownText Path of markdown file or string of markdown text
     * @param minLevel The smallest header number to start grouping. Default value is `1`
     * @param order Smallest number of header tag that you want to start grouping. Default value is `1`(1 -> from h1 to h6, 2 -> from h2 to h6, ...)
     * @param prevLabel Starting text of class or id of header tag. Default value is `""`
     * @param selector Selector that you want to use between id and class. Default value is `"id"`<br>(Possible values - All upper or lower cases of "class" and "id")
     * @param prefix Prefix string of class or id. Default value is `"_"`<br>( "_" -> \<section class="_h1-1"> )
     * @param postfix Postfix string of class or id. Default value is `"-"`<br>( "--" -> \<section class="_h1--1"> )
     * @returns void
     */
    public setDocument: (isPath:boolean, markdownText:string, minLevel?:1|2|3|4|5|6, order?:number, prevLabel?:string, selector?:string, prefix?:string, postfix?:string) => void;

    /**
     * print and return the string of tree structure made from header.
     * @returns string of tree structure made from header.
     */
    public showHeaderTree: ()=>string;

    
    /**
     * text copied from markdown file or text.
     */
    get markdown():string;

    /**
     * html string that is parsed from markdown file or text.
     */
    get html():string;
}

/**
 * Instance of MarkdownDocument Class.
 * Automatically initialized when you use parseToGroup, parseFileToGroup function.
 */
declare let markdownDoc:MarkdownDocument;

export { parseToGroup, parseFileToGroup, MarkdownDocument, markdownDoc };