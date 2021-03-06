class GetElementFactory {

    static getElement(elementType) {
        if (elementType === 'h1' || elementType === 'h2' || elementType === 'h3' ||
            elementType === 'h4' || elementType === 'h5' || elementType === 'h6') {
            return new HeadingElement();
        }
        if (elementType === 'p') {
            return new ParagraphElement();
        }
        if (elementType === 'strong' || elementType === 'em') {
            return new Emphasis();
        }
        if (elementType === 'blockquote') {
            return new Blockquote();
        }
        if (elementType === 'ul' || elementType === 'ol') {
            return new ListElement();
        }
        if (elementType === '#text') {
            return new TextElement();
        }
        if (elementType === 'img') {
            return new ImageElement();
        }
        if (elementType === 'a') {
            return new LinkElement();
        }
        if (elementType === 'table') {
            return new TableElement();
        }
        if (elementType === 'br') {
            return new BreakElement();
        }
    }
}