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
        this.invalidHTML = false;

        this.domParser = new DOMParser();
        this.markDownContent = new MarkdownContent();
        this.htmlConverter = new HtmlConverter();

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
                this.invalidateHTML();
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
        console.log(this.invalidateHTML());
        if (this.invalidateHTML() === false) {
            return this.markDownContent.getMarkDown(node);
        } else {
            return 'Make sure you have html in proper format';
        }
    }

    invalidateHTML() {
        let array = this.htmlContent.split(SPLIT_REGEX).filter(a => a.length !== 0);
        for (let i = 0; i < array.length; i++) {
            let openingBracket = array[i].indexOf('<');
            let closingBracket = array[i].indexOf('>');
            if (openingBracket !== -1 && closingBracket !== -1) {
                let nodeName = array[i].substring(openingBracket + 1, closingBracket);
                console.log(nodeName);
                this.invalidHTML = GetValidationFactory.getValidation(nodeName).isInvalid(array[i], nodeName);
                if (this.invalidHTML === true) {
                    break;
                }
            }
        }
        return this.invalidHTML;
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
        this.outputHTML.innerHTML = this.htmlConverter.replace(this.markdown.innerHTML);
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