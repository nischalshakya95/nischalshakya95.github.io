class ParagraphElement extends ElementFactory {

    replace(content, tag) {
        return DOUBLE_NEW_LINE + content + DOUBLE_NEW_LINE;
    }
}