class ChildElement {

    constructor() {
        this.markDownContent = new MarkdownContent();
        this.result = null;
    }

    getChildNodes(node) {
        if (node.nodeType === 1) {
            for (let c of node.childNodes) {
                if (c.hasChildNodes() && c.childElementCount !== 0) {
                    this.getChildNodes(c);
                }
                c.textContent = this.markDownContent.getMarkDown(c);
                this.result = c.textContent;
            }
            return this.result;
        }
    }
}