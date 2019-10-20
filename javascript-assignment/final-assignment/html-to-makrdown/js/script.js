class Script {

    constructor() {
        this.map = new Mapper().getMap();
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.htmlContent = null;
        this.markDownContent = null;
        this.paragraph = new Paragraph();
        this.headings = new Headings();
        this.event();
    }

    event() {
        document.addEventListener('keyup', e => {
            this.htmlContent = this.html.value;
            this.markDownContent = this.htmlContent;
            this.replace();
            this.updateMarkdown();
        });
    }

    replace() {
        this.replaceHeading();
        this.replaceParagraph();
    }

    replaceHeading(){
        this.headings.setContent(this.htmlContent, this.markDownContent);
        if (this.headings.isHeadingOneExist()) {
            this.markDownContent = this.headings.replaceHeadingOne();
        }
        if (this.headings.isHeadingTwoExist()) {
            this.markDownContent = this.headings.replaceHeadingTwo();
        }
        if (this.headings.isHeadingThreeExist()) {
            this.markDownContent = this.headings.replaceHeadingThree();
        }
        if (this.headings.isHeadingFourExist()) {
            this.markDownContent = this.headings.replaceHeadingFour();
        }
        if (this.headings.isHeadingFiveExist()) {
            this.markDownContent = this.headings.replaceHeadingFive();
        }
        if (this.headings.isHeadingSixExist()) {
            this.markDownContent = this.headings.replaceHeadingSix();
        }
    }

    replaceParagraph(){
        this.paragraph.setContent(this.htmlContent, this.markDownContent);
        if (this.paragraph.isParagraphExist()){
            this.markDownContent = this.paragraph.replaceParagraph();
        }
    }

    updateMarkdown() {
        this.markdown.innerHTML = this.markDownContent;
    }
}

new Script();