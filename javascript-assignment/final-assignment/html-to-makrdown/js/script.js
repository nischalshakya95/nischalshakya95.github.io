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

    updateMarkdown() {
        this.markdown.innerHTML = this.markDownContent;
    }

    replace() {
        this.replaceHeading();
        this.replaceParagraph();
    }

    replaceHeading(){
        this.replaceHeadingOne();
        this.replaceHeadingTwo();
        this.replaceHeadingThree();
        this.replaceHeadingFour();
        this.replaceHeadingFive();
        this.replaceHeadingSix();
    }

    replaceParagraph(){
        this.paragraph.setContent(this.htmlContent, this.markDownContent);
        if (this.paragraph.isParagraphExist()){
            this.markDownContent = this.paragraph.replaceParagraph();
        }
    }

    isHeadingOneExist() {
        return this.htmlContent.includes('<h1>') || this.htmlContent.includes('</h1>');
    }

    replaceHeadingOne() {
        if (this.isHeadingOneExist()) {
            this.markDownContent = this.markDownContent.replace(replaceH1Regex, this.map.get('headingOne')).replace(removeH1Regex, DOUBLE_NEW_LINE);
        }
    }

    isHeadingTwoExist() {
        return this.htmlContent.includes('<h2>') || this.htmlContent.includes('</h2>');
    }

    replaceHeadingTwo() {
        if (this.isHeadingTwoExist()) {
            this.markDownContent = this.markDownContent.replace(replaceH2Regex, this.map.get('headingTwo')).replace(removeH2Regex, DOUBLE_NEW_LINE);
        }
    }

    isHeadingThreeExist() {
        return this.htmlContent.includes('<h3>') || this.htmlContent.includes('</h3>');
    }

    replaceHeadingThree() {
        if (this.isHeadingThreeExist()) {
            this.markDownContent = this.markDownContent.replace(replaceH3Regex, this.map.get('headingThree')).replace(removeH3Regex, DOUBLE_NEW_LINE);
        }
    }

    isHeadingFourExist() {
        return this.htmlContent.includes('<h4>') || this.htmlContent.includes('</h4>');
    }

    replaceHeadingFour() {
        if (this.isHeadingFourExist()) {
            this.markDownContent = this.markDownContent.replace(replaceH4Regex, this.map.get('headingFour')).replace(removeH4Regex, DOUBLE_NEW_LINE);
        }
    }

    isHeadingFiveExist() {
        return this.htmlContent.includes('<h5>') || this.htmlContent.includes('</h5>');
    }

    replaceHeadingFive() {
        if (this.isHeadingFiveExist()) {
            this.markDownContent = this.markDownContent.replace(replaceH5Regex, this.map.get('headingFive')).replace(removeH5Regex, DOUBLE_NEW_LINE);
        }
    }

    isHeadingSixExist() {
        return this.htmlContent.includes('<h6>') || this.htmlContent.includes('</h6>');
    }

    replaceHeadingSix() {
        if (this.isHeadingSixExist()) {
            this.markDownContent = this.markDownContent.replace(replaceH6Regex, this.map.get('headingSix')).replace(removeH6Regex, DOUBLE_NEW_LINE);
        }
    }
}

new Script();