class HeadingElement extends ElementFactory {

    emptyMsg = 'Empty heading';

    replace(node, tag, str) {
        if (str !== null) {
            let content = node.innerText.trim();
            if (content !== '') {
                let headingLevel = parseInt(node.localName.charAt(1));
                if (node.childElementCount > 0) {
                    content = this.getChildElement().getChildNodes(node).replace(TRAILING_NEW_LINE_REG_EXP, '', null);
                }
                if (headingLevel < 3) {
                    let underline = Util.repeat((headingLevel === 1 ? '=' : '-'), content.length);
                    return (
                        '\n\n' + content.replace(/\s+/g, ' ') + '\n' + underline + '\n\n'
                    )
                } else {
                    if (content !== '') {
                        return '\n\n' + Util.repeat('#', headingLevel) + ' ' + content.replace(/\s+/g, ' ') + '\n\n'
                    } else {
                        return this.emptyMsg + '\n\n';
                    }
                }
            } else {
                return this.emptyMsg + '\n\n';
            }

        }
    }
}