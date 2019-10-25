class TextElement extends ElementFactory {

    replace(node, tag) {
        let content = node.textContent.trim();
        return content + '\n';
    }
}