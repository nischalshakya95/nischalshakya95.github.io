class HeadingElement extends ElementFactory {

    replace(node, tag) {
        let content = node.innerText.trim();
        let startTag = '<' + tag.toLowerCase() + '>';
        let endTag = '</' + tag.toLowerCase() + '>';
        if (content !== '') {
            let headingLevel = parseInt(node.localName.charAt(1));
            if ((content.startsWith(startTag) && content.endsWith(endTag))) {
                content = content.replace(startTag, '').replace(endTag, '').trim();
                if (node.childElementCount > 0) {
                    content = this.getChildElement().getChildNodes(node).replace(TRAILING_NEW_LINE_REG_EXP, '');
                }
                if (headingLevel < 3) {
                    let underline = Util.repeat((headingLevel === 1 ? '=' : '-'), content.length);
                    return (
                        '\n\n' + content + '\n' + underline + '\n\n'
                    )
                } else {
                    if (content !== '') {
                        return '\n\n' + Util.repeat('#', headingLevel) + ' ' + content + '\n\n'
                    } else {
                        return 'Content is empty' + '\n\n';
                    }
                }
            } else {
                return 'end tag is invalid or missing ' + '\n\n';
            }

        } else {
            return 'Content is empty' + '\n\n';
        }
    }
}