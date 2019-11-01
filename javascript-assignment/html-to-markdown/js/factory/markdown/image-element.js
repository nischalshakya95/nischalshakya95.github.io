class ImageElement extends ElementFactory {

    replace(node, tag, str) {
        if (node.nextSibling || node.childElementCount > 0) {
            return 'invalid' + DOUBLE_NEW_LINE;
        }
        if (node.title === '') {
            return '![' + node.alt + ']' + '(' + node.src + ')' + ' ';
        }
        if (node.alt === '') {
            return 'alt content is missing';
        }
        if (node.src === '') {
            return 'define image source';
        }
        if (node.alt !== '' && node.src !== '') {
            return '![' + node.alt + ']' + '(' + node.src + ' ' + '"' + node.title + '"' + ')' + ' ';
        }
    }
}