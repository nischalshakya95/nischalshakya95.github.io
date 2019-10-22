class Blockquote extends ElementFactory {

    replace(node, tag) {
        let content = node.textContent.trim();
        content = content.replace(/^\n+|\n+$/g, '');
        content = content.replace(/^/gm, '> ');
        return '\n\n' + content + '\n\n'
    }
}