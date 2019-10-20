class Paragraph {

    constructor() {
        this.map = new Mapper().getMap();
        this.htmlContent = null;
        this.markDownContent = null;
    }

    setContent(htmlContent, markDownContent){
        this.htmlContent = htmlContent;
        this.markDownContent = markDownContent;
    }

    isParagraphExist() {
        return this.htmlContent.includes('<p>') || this.htmlContent.includes('</p>');
    }

    replaceParagraph() {
        return this.markDownContent.replace(REPLACE_PARAGRAPH_REGEX, this.map.get('paragraph')).replace(REMOVE_PARAGRAPH_REGEX, DOUBLE_NEW_LINE);
    }
}