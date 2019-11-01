class Blockquote extends ElementFactory {

    replace(node, tag, str) {
        let content = node.innerText.trim();
        content = content.replace(/^\n+|\n+$/g, '');
        content = content.replace(/^/gm, '> ');
        return '\n\n' + content + '\n\n'
    }
}