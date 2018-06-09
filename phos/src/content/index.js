console.log('YO')
var fakeSourceUrl = 'https://bit.ly/'
var proxy = {
    hasAccess: () => {
        return false
    }
}

function loadImage(containerObject, imageUrl) {

    var img = document.createElement('img');
    img.src = imageUrl
    img.style.width = '300px';

    var figure = document.createElement('figure')
    var figcaption = document.createElement('figcaption')
    figcaption.textContent = containerObject.innerText.split(' ')[0]
    figcaption.attributes
    figure.appendChild(img)
    figure.appendChild(figcaption)
    containerObject.innerText = ''
    containerObject.appendChild(figure)
    $(containerObject).css('color', 'red')
}

function prepareImageRequest(containerObject) {

    var phosImagePlaceholder = 'https://dummyimage.com/300x200&text=Phos'
    var requestButton = document.createElement('a');
    requestButton.innerText = "REQUEST KEY"
    $(requestButton).css('margin-left', '10px')
    $(requestButton).css('font-size', '9px')
    containerObject.innerText = containerObject.innerText.split(' ')[0]
    containerObject.appendChild(requestButton)
}

//<i class="fas fa-key"></i>
//<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">

function checkAccess() {
    //if I have the key, return true else false
    //1. retrieve my identity and query the proxy with it
    //2-t. if the proxy says "okay", I'll start retrieve the encrypted file
    //2-f. if the proxy says "no", I'll ask for permission
    return proxy.hasAccess()
}

var phosObject = $("p:contains('d33p://')")[0]

if (phosObject) {
    var phosCode = phosObject.innerText.split(' ')[0].replace('d33p://', '')

    if (checkAccess()) {
        var url = `${fakeSourceUrl}${phosCode}`;
        loadImage(phosObject, url)
    }
    else {
        prepareImageRequest(phosObject)
    }
}