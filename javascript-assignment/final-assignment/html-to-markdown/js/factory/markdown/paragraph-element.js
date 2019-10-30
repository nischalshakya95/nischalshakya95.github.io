class ParagraphElement extends ElementFactory {

    emptyMsg = 'Empty paragraph';

    replace(node, tag, str) {
        if (str !== null) {
            if (this.validate(str, tag)) {
                if (node.childElementCount > 0) {
                    this.getChildElement().getChildNodes(node);
                }
                return node.textContent.replace(/\s+/g, ' ') + '\n\n';
            } else {
                return "Invalid ending tag";
            }
        } else {
            return this.emptyMsg;
        }
    }

    validate(str, tag) {
        return str.endsWith('</' + tag.toLowerCase() + '>');
    }
}