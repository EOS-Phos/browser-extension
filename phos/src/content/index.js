console.log('YO')
var fakeSourceUrl = 'https://bit.ly/'

function loadImage(containerObject, urlCode) {

    var img = document.createElement('img');
    img.src = `${fakeSourceUrl}${urlCode}`;
    img.style.width = '200px';

    var figure = document.createElement('figure')
    var figcaption = document.createElement('figcaption')
    figcaption.textContent = containerObject.innerText
    figure.appendChild(img)
    figure.appendChild(figcaption)
    containerObject.empty()
    containerObject.appendChild(figure)
}

var phosObject = $("p:contains('phos://')")[0]

if (phosObject) {
    var phosCode = phosObject.innerText.split('phos://')[1]

    loadImage(phosObject, phosCode)
}