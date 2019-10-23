class Emphasis extends ElementFactory {

    replaceStrong(content) {
        return DOUBLE_NEW_LINE + STRONG + content + STRONG + DOUBLE_NEW_LINE;
    }

    replaceEm(content) {
        if (content === '') return '';
        return DOUBLE_NEW_LINE + EM + content + EM + DOUBLE_NEW_LINE;
    }

    replace(node, tag) {
        let content = node.textContent.trim();
        console.log('emphasis content ', content);
        if (tag === 'em') {
            return this.replaceEm(content);
        } else if (tag === 'strong') {
            return this.replaceStrong(content);
        }
    }

}