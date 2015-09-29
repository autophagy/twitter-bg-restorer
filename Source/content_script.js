var body = document.getElementsByTagName('body')[0];
chrome.storage.sync.get({
    backgroundURL: '',
    backgroundTile: true,
    backgroundColour: '',
    backgroundType: 'image'
}, function(items) {

    var css = document.createElement("style");
    css.type = "text/css";
    var cssString = "body { ";
    css.innerHTML = "strong { color: red }";
    document.body.appendChild(css);

    if(items.backgroundColour != '')
    {
        cssString += "background-color: " + items.backgroundColour + "; ";
    }

    if(items.backgroundType == 'image') {
        cssString += "background-image: url(" + items.backgroundURL + "); "
        cssString += "background-attachment: 'fixed'; "
        if(items.backgroundTile) {
            cssString += "background-repeat: 'repeat'; "
        } else {
            cssString += "background-repeat: 'no-repeat'; "
        }
    }

    css.innerHTML = cssString;
    document.body.appendChild(css);
});
