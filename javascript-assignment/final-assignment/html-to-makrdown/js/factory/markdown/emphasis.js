class Emphasis extends ElementFactory {

    replaceStrong(content) {
        if (!content) return '';
        return DOUBLE_NEW_LINE + STRONG + content + STRONG + DOUBLE_NEW_LINE;
    }

    replaceEm(content) {
        if (!content) return '';
        return DOUBLE_NEW_LINE + EM + content + EM + DOUBLE_NEW_LINE;
    }

    replace(node, tag) {
        let content = node.innerText.trim();
        if (node.childElementCount > 0) {
            content = this.getChildElement().getChildNodes(node).replace(TRAILING_NEW_LINE_REG_EXP, '');
        }
        if (!content) return '';
        if (tag === 'em') {
            return this.replaceEm(content);
        } else if (tag === 'strong') {
            return this.replaceStrong(content);
        }
    }

}