class ImageElement extends ElementFactory {

    replace(node, tag) {
        return '![' + node.alt + ']' + '(' + node.src + ')' + ' ';
    }
}