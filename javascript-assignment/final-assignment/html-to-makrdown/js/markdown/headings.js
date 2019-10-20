class Headings {

    constructor() {
        this.map = new Mapper().getMap();
        this.htmlContent = null;
        this.markDownContent = null;
    }

    setContent(htmlContent, markDownContent) {
        this.htmlContent = htmlContent;
        this.markDownContent = markDownContent;
    }

    isHeadingOneExist() {
        return this.htmlContent.includes('<h1>') || this.htmlContent.includes('</h1>');
    }

    replaceHeadingOne() {
        return this.markDownContent.replace(replaceH1Regex, this.map.get('headingOne')).replace(removeH1Regex, DOUBLE_NEW_LINE);
    }

    isHeadingTwoExist() {
        return this.htmlContent.includes('<h2>') || this.htmlContent.includes('</h2>');
    }

    replaceHeadingTwo() {
        return this.markDownContent.replace(replaceH2Regex, this.map.get('headingTwo')).replace(removeH2Regex, DOUBLE_NEW_LINE);
    }

    isHeadingThreeExist() {
        return this.htmlContent.includes('<h3>') || this.htmlContent.includes('</h3>');
    }

    replaceHeadingThree() {
        return this.markDownContent.replace(replaceH3Regex, this.map.get('headingThree')).replace(removeH3Regex, DOUBLE_NEW_LINE);
    }

    isHeadingFourExist() {
        return this.htmlContent.includes('<h4>') || this.htmlContent.includes('</h4>');
    }

    replaceHeadingFour() {
        return this.markDownContent.replace(replaceH4Regex, this.map.get('headingFour')).replace(removeH4Regex, DOUBLE_NEW_LINE);
    }

    isHeadingFiveExist() {
        return this.htmlContent.includes('<h5>') || this.htmlContent.includes('</h5>');
    }

    replaceHeadingFive() {
        return this.markDownContent.replace(replaceH5Regex, this.map.get('headingFive')).replace(removeH5Regex, DOUBLE_NEW_LINE);
    }

    isHeadingSixExist() {
        return this.htmlContent.includes('<h6>') || this.htmlContent.includes('</h6>');
    }

    replaceHeadingSix() {
        return this.markDownContent.replace(replaceH6Regex, this.map.get('headingSix')).replace(removeH6Regex, DOUBLE_NEW_LINE);
    }
}