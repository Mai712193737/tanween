function addStyleSheet() {
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/css/header-footer.css';
    
    document.head.appendChild(cssLink);
}

function addHeaderFooter() {
    fetch('/pages/header-footer.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const header = doc.getElementById('header').cloneNode(true);
            const footer = doc.getElementById ('footer').cloneNode(true);

            document.body.insertBefore(header, document.body.firstChild);
            document.body.appendChild(footer);
        });
}

addStyleSheet()
addHeaderFooter()