class TableElement extends ElementFactory {

    constructor() {
        super();
        this.heading = '';
        this.rows = '';
        this.afterHeading = '';
        this.totalHeading = 0;
        this.headingLength = [];
    }

    replace(node, tag) {
        if (node.rows.length !== 0) {
            for (let i = 0; i < node.rows.length; i++) {
                for (let j = 0; j < node.rows[i].cells.length; j++) {
                    let row = node.rows[i].cells[j];
                    if (row.nodeName.toLowerCase() === 'th') {
                        this.totalHeading = node.rows[i].childElementCount;
                        this.headingLength.push(row.innerText.length);
                        this.heading += this.replaceHeading(row.innerText.trim());
                    }
                    if (row.nodeName.toLowerCase() === 'td') {
                        this.rows += this.replaceRow(row.innerText.trim());
                    }
                }
                this.rows += '|' + '\n';
            }
            return this.heading + '|' + '\n' + this.generateLine() + this.rows;
        }
    }

    generateLine() {
        for (let i = 0; i < this.headingLength.length; i++) {
            this.afterHeading += '| ' + Util.repeat('-', this.headingLength[i]) + ' ';
        }
        return this.afterHeading;
    }

    addSpacesBetweenText() {

    }

    replaceHeading(content) {
        return '| ' + content + ' ';
    }

    replaceRow(content) {
        return '| ' + content + ' ';
    }


}