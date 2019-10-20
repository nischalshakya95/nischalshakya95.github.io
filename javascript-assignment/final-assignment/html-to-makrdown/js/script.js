class Script {

    constructor() {
        this.map = new Mapper().getMap();
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.htmlContent = null;
        this.markdownContent = null;
        this.event();
    }

    event() {
        document.addEventListener('keyup', () => {
            this.htmlContent = this.html.value;
            this.replaceHeadingOne();
            this.replaceHeadingTwo();
            this.markdown.innerHTML = this.htmlContent;
        });
    }

    isHeadingOneExist() {
        return this.htmlContent.includes('<h1>') || this.htmlContent.includes('</h1>');
    }

    replaceHeadingOne() {
        if (this.isHeadingOneExist()) {
            this.htmlContent = this.htmlContent.replace(replaceH1Regex, this.map.get('headingOne')).replace(removeH1Regex, '\n\n');
        }
    }

    isHeadingTwoExist() {
        return this.htmlContent.includes('<h2>') || this.htmlContent.includes('</h2>');
    }

    replaceHeadingTwo() {
        if (this.isHeadingTwoExist()) {
            this.htmlContent = this.htmlContent.replace(replaceH2Regex, this.map.get('headingTwo')).replace(removeH2Regex, '\n\n');
        }
    }
}

new Script();