class ParagraphElement extends ElementFactory {

    replace(node, tag) {
        if (node.childElementCount > 0) {
            this.getChildElement().getChildNodes(node).replace(TRAILING_NEW_LINE_REG_EXP, '');
        }
        return DOUBLE_NEW_LINE + node.textContent.replace(/[\r\n]+/gm, ' ') + DOUBLE_NEW_LINE;
    }
}