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

        this.updateStatus();
        this.event();
        this.arr = [];
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

    getMarkdown(node) {
        // if (node.textContent !== '') {
        //     let regex = new RegExp('<' + node.localName + '>(.+)', 'ig');
        //     let str = this.htmlContent.match(regex);
        //     console.log(str);
        //     if (str !== null) {
        //         return this.markDownContent.getMarkDown(node, str[str.length - 1]);
        //     }
        // }
        // if (node.src !== '') {
        //     return this.markDownContent.getMarkDown(node);
        // }
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