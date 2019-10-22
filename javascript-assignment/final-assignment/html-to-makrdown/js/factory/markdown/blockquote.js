class Blockquote extends ElementFactory {

    replace(content, tag) {
        content = content.replace(/^\n+|\n+$/g, '');
        content = content.replace(/^/gm, '> ');
        console.log(content);
        return '\n\n' + content + '\n\n'
    }
}