class Script {

    constructor(){
        this.map = new Mapper().getMap();
        this.html = document.getElementById('html');
        this.markdown = document.getElementById('markdown');
        this.preview = document.getElementById('preview');
        this.htmlContent = null;
        this.markdownContent = null;
        this.previewContent = null;
        this.event();
    }

    event(){
        document.addEventListener('keyup', () => {
            let htmlContent = this.html.value;
            htmlContent = htmlContent.replace(replaceH1Regex, this.map.get('headingOne')).replace(removeH1Regex, '');
            this.markdownContent = htmlContent;
            this.previewContent = this.html.value;
            this.markdown.innerHTML = this.markdownContent;
            this.preview.innerHTML = this.previewContent;
        });
    }
}

new Script();