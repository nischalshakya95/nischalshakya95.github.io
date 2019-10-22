class ListElement extends ElementFactory {

    replace(content, tag) {
        return '\n\n' + '* ' + content + '\n\n';
    }
}