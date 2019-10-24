class MarkdownContent {

    constructor() {
        this.elementFactory = null;
    }

    getMarkDown(node) {
        this.elementFactory = GetElementFactory.getElement(node.nodeName.toLowerCase());
        debugger
        return this.elementFactory.replace(node, node.localName).replace(LEADING_NEW_LINE_REG_EXP, '');
    }
}