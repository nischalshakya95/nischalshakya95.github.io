class Script {

    blockElements = [
        'address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas',
        'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption',
        'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav',
        'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table',
        'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'
    ];

    constructor() {
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.domParser = new DOMParser();
        this.htmlContent = null;
        this.childNodes = null;
        this.markDownContent = null;
        this.headings = new Headings();
        this.event();
    }

    event() {
        document.addEventListener('keyup', e => {
            this.htmlContent = this.html.value;
            this.markDownContent = this.htmlContent;
            this.createParser();
            this.replace();
            this.updateMarkdown();
        });
    }

    createParser() {
        if (typeof this.htmlContent === 'string') {
            let doc = this.domParser.parseFromString('<x-parser id = "root">' + this.htmlContent + '</x-parser>', 'text/html');
            this.childNodes = doc.getElementById('root').childNodes;
        }
    }

    replace() {
        for (let i of this.childNodes) {
            if (typeof i !== undefined) {
                let tag = this.blockElements.indexOf(i.localName);
                let compare = this.blockElements[tag];
                if (compare === 'h1' || compare === 'h2' || compare === 'h3' ||
                    compare === 'h4' || compare === 'h5' || compare === 'h6') {
                    this.markDownContent = this.headings.replaceHeading(i.textContent.trim(), parseInt(i.localName.charAt(1)));
                    console.log(this.markDownContent);
                }
            }
        }
    }

    updateMarkdown() {
        this.markdown.innerHTML.concat(this.markDownContent);
    }

}

new Script();