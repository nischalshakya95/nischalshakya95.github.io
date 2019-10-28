class MarkdownContent {

    constructor() {
        this.elementFactory = null;
        this.result = null;
    }

    getMarkDown(node, str) {
        this.elementFactory = GetElementFactory.getElement(node.nodeName.toLowerCase());
        if (typeof this.elementFactory !== 'undefined') {
            this.result = this.elementFactory.replace(node, node.localName, str);
            if (typeof this.result !== 'undefined') {
                return this.result.replace(LEADING_NEW_LINE_REG_EXP, '');
            }
        }
    }
}