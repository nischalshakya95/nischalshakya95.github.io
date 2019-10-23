class HeadingElement extends ElementFactory {

    constructor() {
        super();
        this.markDownContent = new MarkdownContent();
        this.result = null;
    }

    replace(node, tag) {
        let content = node.textContent.trim();
        let headingLevel = parseInt(tag.charAt(1));
        if (node.childElementCount > 0) {
            this.getChildNodes(node);
        }
        if (headingLevel < 3) {
            let underline = Util.repeat((headingLevel === 1 ? '=' : '-'), content.length);
            return (
                '\n\n' + content + '\n' + underline + '\n\n'
            )
        } else {
            return '\n\n' + Util.repeat('#', headingLevel) + ' ' + content + '\n\n'
        }
    }

    getChildNodes(node) {
        if (node.nodeType === 1) {
            for (let c of node.childNodes) {
                if (c.hasChildNodes() && c.childElementCount !== 0) {
                    this.getChildNodes(c);
                }
            }
        }
    }
}