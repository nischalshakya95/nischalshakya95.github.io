class ListElement extends ElementFactory {

    constructor() {
        super();
        this.lists = [];
        this.count = 1;
    }

    replace(node, tag) {
        for (let c of node.children) {
            if (c.nodeType === 1) {
                if (c.parentElement.localName === 'ul') {
                    if (c.childElementCount > 0) {
                        this.getChildElement().getChildNodes(c);
                    }
                    this.lists.push('* ' + c.innerText.replace(/[\n]+/gm, ' ') + '\n')
                } else if (c.parentElement.localName === 'ol') {
                    if (c.childElementCount > 0) {
                        this.getChildElement().getChildNodes(c);
                    }
                    this.lists.push(this.count++ + '. ' + c.innerText.replace(/[\n]+/gm, ' ') + '\n')
                }
            }
        }
        this.lists.push('\n');
        return this.lists.join('');
    }
}