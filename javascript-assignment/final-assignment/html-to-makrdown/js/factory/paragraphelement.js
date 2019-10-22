class ParagraphElement extends ElementFactory {

    replace(content) {
        return DOUBLE_NEW_LINE + content + DOUBLE_NEW_LINE;
    }
}