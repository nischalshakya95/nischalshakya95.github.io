class HeadingElement extends ElementFactory{

    replace(content, headingLevel) {
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