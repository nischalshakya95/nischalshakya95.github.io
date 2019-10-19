class Mapper {

    constructor() {
        this.map = new Map();
        this.setMap();
    }

    setMap() {
        this.setHeadingKeyAndValue();
    }

    getMap() {
        return this.map;
    }

    setHeadingKeyAndValue() {
        this.map.set('headingOne', '#');
        this.map.set('headingTwo', '##');
        this.map.set('headingThree', '###');
        this.map.set('headingFour', '####');
        this.map.set('headingFive', '#####');
        this.map.set('headingSix', '######');
    }

    setParagraphs() {
        this.map.set('paragraphs', '');
    }

    setLineBreaks() {
        this.map.set('linebreaks', '\n');
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
