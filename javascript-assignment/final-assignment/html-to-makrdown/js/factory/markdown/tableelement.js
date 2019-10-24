class TableElement extends ElementFactory {

    constructor() {
        super();
        this.heading = '';
        this.rows = ' ';
    }

    replace(node, tag) {
        console.log(node.rows);
        if (node.rows.length !== 0) {
            for (let i = 0; i < node.rows.length; i++) {
                for (let j = 0; j < node.rows[i].cells.length; j++) {
                    let row = node.rows[i].cells[j];
                    if (row.nodeName.toLowerCase() === 'th') {
                        this.heading += this.replaceHeading(row.innerText.trim());
                    }
                    if (row.nodeName.toLowerCase() === 'td') {
                        this.rows += this.replaceRow(row.innerText.trim());
                    }
                }
                this.rows += '\n';
            }
            return this.heading + ' |' + '\n' + this.rows;
        }
    }

    replaceHeading(content) {
        return '| ' + content + ' ';
    }

    replaceRow(content) {
        return '| ' + content + ' ';
    }


}