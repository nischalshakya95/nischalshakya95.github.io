class Content {

    constructor() {
        this.map = new Mapper().getMap();
        this.htmlContent = null;
        this.markDownContent = null;
    }

    setContent(htmlContent, markDownContent){
        this.htmlContent = htmlContent;
        this.markDownContent = markDownContent;
    }
}