class LinkElement extends ElementFactory {

    replace(node, tag, str) {
        return '[' + node.innerText + ']' + '(' + node.href + ')' + ' ';
    }

}