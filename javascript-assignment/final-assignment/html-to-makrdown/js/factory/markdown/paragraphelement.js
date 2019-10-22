class ParagraphElement extends ElementFactory {

    replace(node, tag) {
        let content = node.textContent.trim();
        return DOUBLE_NEW_LINE + content + DOUBLE_NEW_LINE;
    }
}