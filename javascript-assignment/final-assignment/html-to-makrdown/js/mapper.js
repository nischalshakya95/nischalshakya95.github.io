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

}
