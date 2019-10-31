class Script {

    invalidMsg = 'Make sure you have html in proper format' + '\n\n';

    constructor() {
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.outputHTML = document.getElementById('output-html');

        this.htmlContent = null;
        this.childNodes = null;
        this.invalidHTML = false;

        this.domParser = new DOMParser();
        this.markDownContent = new MarkdownContent();

        this.event();
        this.arr = [];
    }


    event() {
        document.addEventListener('keyup', e => {
            this.htmlContent = this.html.value;
            if (e.key !== 'Enter') {
                this.createParser();
                this.updateMarkDown();
                this.generateMarkdown();
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
        return this.markDownContent.getMarkDown(node);
    }

    invalidateHTML() {
        let array = this.htmlContent.split(SPLIT_REGEX).filter(a => a.length !== 0);
        for (let i = 0; i < array.length; i++) {
            let openingBracket = array[i].indexOf('<');
            let closingBracket = array[i].indexOf('>');
            if (openingBracket !== -1 && closingBracket !== -1) {
                let nodeName = array[i].substring(openingBracket + 1, closingBracket);
                if (array[i].startsWith('<' + nodeName + '>') && array[i].endsWith('</' + nodeName + '>')) {
                    if (nodeName === 'h1') {
                        this.invalidHTML = HEADING_ONE_VALIDATION_REGEX.test(array[i]);
                    }
                    if (nodeName === 'h2') {
                        this.invalidHTML = HEADING_TWO_VALIDATION_REGEX.test(array[i]);
                    }
                    if (nodeName === 'h3') {
                        this.invalidHTML = HEADING_THREE_VALIDATION_REGEX.test(array[i]);
                    }
                    if (nodeName === 'h4') {
                        this.invalidHTML = HEADING_FOUR_VALIDATION_REGEX.test(array[i]);
                    }
                    if (nodeName === 'h5') {
                        this.invalidHTML = HEADING_FIVE_VALIDATION_REGEX.test(array[i]);
                    }
                    if (nodeName === 'h6') {
                        this.invalidHTML = HEADING_SIX_VALIDATION_REGEX.test(array[i]);
                    }
                } else {
                    this.invalidHTML = true;
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
        this.markdown.innerHTML = this.invalidateHTML() ? this.invalidMsg : this.generateMarkdown().join('');
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