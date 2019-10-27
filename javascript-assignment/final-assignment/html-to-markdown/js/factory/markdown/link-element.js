class LinkElement extends ElementFactory {

    replace(node, tag) {
        return '[' + node.innerText + ']' + '(' + node.href + ')' + ' ';
    }

}