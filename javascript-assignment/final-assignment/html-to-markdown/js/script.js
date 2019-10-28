class Script {

    constructor() {
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.trigger = document.getElementById('raw-switch');
        this.outputHTML = document.getElementById('output-html');

        this.status = this.trigger.getElementsByTagName('span')[0];

        this.status.innerText = 'On';
        this.rawMode = true;
        this.htmlContent = null;
        this.childNodes = null;

        this.domParser = new DOMParser();
        this.markDownContent = new MarkdownContent();
        this.htmlConvertor = new HtmlConverter();
        this.stack = new Stack();

        this.updateStatus();
        this.event();
        this.arr = [];
        this.htmlArr = [];
    }

    updateStatus() {
        this.trigger.addEventListener('click', () => {
            this.rawMode = !this.rawMode;
            this.status.innerText = this.rawMode ? 'On' : 'Off';
            this.status.innerText === 'On' ? this.markdown.style.display = 'block' : this.markdown.style.display = 'none';
            this.status.innerText === 'Off' ? this.outputHTML.style.display = 'block' : this.outputHTML.style.display = 'none';
        });
    }


    event() {
        document.addEventListener('keyup', e => {
            this.htmlContent = this.html.value;
            if (e.key !== 'Enter') {
                this.createParser();
                this.generateMarkdown();
                this.validate();
                this.updateMarkDown();
            }
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

    validate() {
        let str = this.htmlContent;
        if (str.includes('<h1>')) {
            let startIndex = str.indexOf('<h1>');
            let endIndex = str.indexOf('</h1>');
            let startTag = '<h1>';
            let endTag = '</h1>';
            let content = str.substring(startIndex, endIndex);
            let heading = new Heading(startIndex, startTag, content, endIndex, endTag);
        }
    }

    getMarkdown(node) {
        return this.markDownContent.getMarkDown(node);
    }

    generateMarkdown() {
        if (this.arr.length >= 0) {
            return this.arr.reduce((acc, node) => {
                return [...acc, this.getMarkdown(node)];
            }, []);
        }
    }

    updateMarkDown() {
        this.markdown.innerHTML = this.generateMarkdown().join('');
        this.outputHTML.innerHTML = this.htmlConvertor.replace(this.markdown.innerHTML);
    }
}

new Script();

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.getElementById('download').addEventListener('click', () => {
    download('README.md', document.getElementById('markdown').value);
});