class ImageElement extends ElementFactory {

    replace(node, tag) {
        if (node.title === '') {
            return '![' + node.alt + ']' + '(' + node.src + ')' + ' ';
        }
        return '![' + node.alt + ']' + '(' + node.src + ' ' + '"' + node.title + '"' + ')' + ' ';
    }
}