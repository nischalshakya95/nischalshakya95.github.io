let html = document.getElementById('html');
let markdown = document.getElementById('markdown');
let htmlUpdateContent = document.getElementById('html-content');


document.addEventListener('keyup', e => {
    let htmlContent = html.value;
    htmlContent = htmlContent.replace(replaceH1Regex, '#').replace(removeH1Regex, '');  
    htmlContent = htmlContent.replace(replaceH2Regex, '##').replace(removeH2Regex, '');
    markdown.innerHTML = htmlContent;
    htmlContent.innerHTML = htmlContent;
    htmlUpdateContent.innerHTML = html.value;
    
});