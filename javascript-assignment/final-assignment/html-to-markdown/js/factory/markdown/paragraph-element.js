class ParagraphElement extends ElementFactory {

    replace(node, tag) {
        if (node.childElementCount > 0) {
            this.getChildElement().getChildNodes(node);
        }
        return node.textContent + '\n\n';
    }
}