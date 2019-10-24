class ImageElement extends ElementFactory {

    replace(node, tag) {
        if (node.nextSibling || node.childElementCount > 0) {
            return 'invalid' + DOUBLE_NEW_LINE;
        }
        if (node.title === '') {
            return '![' + node.alt + ']' + '(' + node.src + ')' + ' ';
        }
        return '![' + node.alt + ']' + '(' + node.src + ' ' + '"' + node.title + '"' + ')' + ' ';
    }
}