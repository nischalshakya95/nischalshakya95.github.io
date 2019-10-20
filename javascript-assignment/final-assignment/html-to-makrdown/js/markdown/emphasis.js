class Emphasis extends Content {

    isStrongExist() {
        return this.htmlContent.includes('<strong>') || this.htmlContent.includes('</strong>');
    }

    replaceStrong() {
        return this.markDownContent.replace(REPLACE_EMPHASIS_REGEX, this.map.get('bold')).replace(REMOVE_EMPHASIS_REGEX, this.map.get('bold'));
    }

    isEmExist() {
        return this.htmlContent.includes('<em>') || this.htmlContent.includes('</em>');
    }

    replaceEm() {
        return this.markDownContent.replace(REPLACE_EM_REGEX, this.map.get('italic')).replace(REMOVE_EM_REGEX, this.map.get('italic'));
    }
}