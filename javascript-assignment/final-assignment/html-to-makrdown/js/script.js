class Script {

    constructor() {
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.domParser = new DOMParser();
        this.htmlContent = null;
        this.childNodes = null;
        this.markDownContent = new MarkdownContent();
        this.event();
        this.arr = [];
    }

    event() {
        document.addEventListener('keyup', e => {
            this.htmlContent = this.html.value;
            this.createParser();
            this.updateMarkDown();
            this.generateMarkdown();
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

    getMarkdown(node) {
        return this.markDownContent.getMarkDown(node);
    }

    generateMarkdown() {
        if (this.arr.length >= 0) {
            return this.arr.reduce((acc, node) => {
                if (node.nodeType === 1 || node.nodeType === 3) {
                    return [...acc, this.getMarkdown(node)];
                }
                return acc;
            }, []);
        }
    }

    updateMarkDown() {
        this.markdown.innerHTML = this.generateMarkdown().join('');
    }
}

new Script();