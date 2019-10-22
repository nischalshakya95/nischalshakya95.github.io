class ListElement extends ElementFactory {

    constructor() {
        super();
        this.lists = [];
        this.count = 1;
    }

    replace(node, tag) {
        for (let c of node.children) {
            if (c.nodeType === 1) {
                c.parentElement.localName === 'ol' ? this.lists.push(this.count++ + '. ' + c.textContent + '\n') : this.lists.push('* ' + c.textContent + '\n');
            }
        }
        this.lists.push('\n');
        return this.lists.join('');
    }
}