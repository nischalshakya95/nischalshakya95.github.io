class GetElementFactory {

    constructor(elementType) {
        this.elementType = elementType;
    }

    getElement() {
        if (this.elementType === 'h1' || this.elementType === 'h2' || this.elementType === 'h3' ||
            this.elementType === 'h4' || this.elementType === 'h5' || this.elementType === 'h6') {
            return new HeadingElement();
        }
        if (this.elementType === 'p') {
            return new ParagraphElement();
        }
    }
}