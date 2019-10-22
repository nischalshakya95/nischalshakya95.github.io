class Script {

    constructor() {
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.domParser = new DOMParser();
        this.htmlContent = null;
        this.childNodes = null;
        this.markDownContent = null;
        this.elementFactory = null;
        this.event();
        this.arr = [];
    }

    event() {
        document.addEventListener('keyup', e => {
            this.htmlContent = this.html.value;
            this.markDownContent = this.htmlContent;
            this.createParser();
            this.updateMarkDown();
            this.updateReplace();
        });
    }

    createParser() {
        if (typeof this.htmlContent === 'string') {
            let doc = this.domParser.parseFromString('<x-parser id = "root">' + this.htmlContent + '</x-parser>', 'text/html');
            this.childNodes = doc.getElementById('root').childNodes;
            this.arr = Array.from(this.childNodes);
            console.log(this.childNodes);
        }
    }

    compareAndReplace(node) {
        let content = node.textContent.trim();
        this.elementFactory = GetElementFactory.getElement(node.localName);
        if (node.localName === 'ul' || node.localName === 'ol') {
            for (let c of node.children) {
                content = c.textContent.trim();
                this.markDownContent = this.elementFactory.replace(content, node.localName).replace(LEADING_NEW_LINE_REG_EXP, '');
            }
        } else {
            this.markDownContent = this.elementFactory.replace(content, node.localName).replace(LEADING_NEW_LINE_REG_EXP, '');
        }
        console.log(content);

        return this.markDownContent;
    }

    updateReplace() {
        if (this.arr.length >= 0) {
            return this.arr.reduce((acc, node) => {
                if (node.nodeType === 1) {
                    return [...acc, this.compareAndReplace(node)];
                }
                return acc;
            }, []);
        }
    }

    updateMarkDown() {
        this.markdown.innerHTML = this.updateReplace().join('');
    }
}

new Script();