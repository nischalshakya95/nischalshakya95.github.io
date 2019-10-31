class ParagraphElement extends ElementFactory {

    emptyMsg = 'Empty paragraph';

    replace(node, tag, str) {
        if (str !== null) {
            if (node.childElementCount > 0) {
                this.getChildElement().getChildNodes(node);
            }
            return node.textContent.replace(/\s+/g, ' ') + '\n\n';
        } else {
            return this.emptyMsg;
        }
    }
}