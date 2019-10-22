class Script {

    blockElements = [
        'address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas',
        'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption',
        'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav',
        'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table',
        'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul', 'strong', 'em'
    ];

    constructor() {
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.domParser = new DOMParser();
        this.htmlContent = null;
        this.childNodes = null;
        this.markDownContent = null;
        this.headings = new Headings();
        this.paragraphs = new Paragraph();
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
        }
    }

    compareAndReplace(node) {
        let tag = this.blockElements.indexOf(node.localName);
        let compare = this.blockElements[tag];
        if (tag !== -1) {
            let content = node.textContent.trim();
            if (compare === 'h1' || compare === 'h2' || compare === 'h3' ||
                compare === 'h4' || compare === 'h5' || compare === 'h6') {
                this.markDownContent = this.headings.replaceHeading(content, parseInt(node.localName.charAt(1)));
            }
            if (compare === 'p') {
                this.markDownContent = this.paragraphs.replaceParagraph(content);
            }
            return this.markDownContent;
        }
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