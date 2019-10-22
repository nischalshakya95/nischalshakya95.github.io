class HeadingElement extends ElementFactory{

    replace(node, tag) {
        let content = node.textContent.trim();
        let headingLevel = parseInt(tag.charAt(1));
        if (headingLevel < 3) {
            let underline = Util.repeat((headingLevel === 1 ? '=' : '-'), content.length);
            return (
                '\n\n' + content + '\n' + underline + '\n\n'
            )
        } else {
            return '\n\n' + Util.repeat('#', headingLevel) + ' ' + content + '\n\n'
        }
    }
}