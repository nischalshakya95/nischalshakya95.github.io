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
        this.emphasis = new Emphasis();
        this.event();
        this.arr = [];
    }

    event() {
        document.addEventListener('keyup', e => {
            this.htmlContent = this.html.value;
            this.markDownContent = this.htmlContent;
            this.createParser();
            this.replace();
            this.updateMarkDown();
            this.updateReplace();
        });
    }

    createParser() {
        if (typeof this.htmlContent === 'string') {
            let doc = this.domParser.parseFromString('<x-parser id = "root">' + this.htmlContent + '</x-parser>', 'text/html');
            this.childNodes = doc.getElementById('root').childNodes;
            console.log(this.childNodes);
            this.arr = Array.from(this.childNodes);
            // console.log(this.arr);
        }
    }

    replace() {
        for (let i of this.childNodes) {
            if (typeof i !== undefined) {
                let tag = this.blockElements.indexOf(i.localName);
                let compare = this.blockElements[tag];
                if (tag !== -1) {
                    let content = i.textContent.trim();
                    if (compare === 'h1' || compare === 'h2' || compare === 'h3' ||
                        compare === 'h4' || compare === 'h5' || compare === 'h6') {
                        this.markDownContent = this.headings.replaceHeading(content, parseInt(i.localName.charAt(1)));
                    }
                    if (compare === 'p') {
                        this.markDownContent = this.paragraphs.replaceParagraph(content);
                    }
                }
            }
        }
    }

    updateReplace() {
        if (this.arr.length >= 0) {
            return this.arr.reduce((acc, output) => {
                if (output.nodeType === 1) {
                    console.log(acc, output.innerHTML);
                    return [...acc  , output.innerHTML + '\n\n'];
                }
                return acc
            }, []);
        }
    }

    updateMarkDown() {
        console.log(this.arr);
        this.markdown.innerHTML = this.updateReplace();
    }

}

new Script();