class Mapper {

    constructor() {
        this.map = new Map();
        this.setMap();
    }

    setMap() {
        this.setHeadingKeyAndValue();
        this.setParagraph();
        this.setEmphasis();
    }

    getMap() {
        return this.map;
    }

    setHeadingKeyAndValue() {
        this.map.set('headingOne', '# ');
        this.map.set('headingTwo', '## ');
        this.map.set('headingThree', '### ');
        this.map.set('headingFour', '#### ');
        this.map.set('headingFive', '##### ');
        this.map.set('headingSix', '###### ');
    }

    setParagraph() {
        this.map.set('paragraph', '');
    }

    setLineBreak() {
        this.map.set('linebreak', '\n');
    }

    setEmphasis() {
        this.map.set('bold', '**');
        this.map.set('italic', '*');
        this.map.set('boldAndItalic', '***');
    }

    setBlockQuotes() {
        this.map.set('blockquotes', '>');
        this.map.set('nestedblockquotes', '>>');
    }

    setUnorderedLists() {
        this.map.set('list', '-');
    }
}
