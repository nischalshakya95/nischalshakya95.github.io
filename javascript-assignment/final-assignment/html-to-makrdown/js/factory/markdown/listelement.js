class ListElement extends ElementFactory {

    constructor() {
        super();
        this.lists = [];
        this.count = 1;
    }

    replace(content, tag) {
        for (let c of content) {
            if (c.nodeType === 1) {
                c.parentNode.localName === 'ol' ? this.lists.push(this.count++ + '. ' + c.textContent + '\n') : this.lists.push('* ' + c.textContent + '\n');
            }
        }
        this.lists.push('\n');
        return this.lists.join('');
    }
}