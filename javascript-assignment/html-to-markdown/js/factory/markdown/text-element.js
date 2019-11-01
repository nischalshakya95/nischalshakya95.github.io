class TextElement extends ElementFactory {

    replace(node, tag, str) {
        let content = node.textContent.trim();
        return content + '\n';
    }
}