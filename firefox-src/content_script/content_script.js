var body = document.getElementsByTagName('body')[0];
browser.storage.local.get({
    backgroundTile: true,
    backgroundCover: false,
    backgroundColour: '',
    backgroundType: 'image',
    backgroundBase64: ''
}, function(items) {
    var newCSSElement = document.createElement("style");
    newCSSElement.type = "text/css";

    // This applies the CSS rule to every page except for permalink pages
    // This is so the user's background on a tweet permalink will be displayed;
    var cssString = "body:not(.PermalinkPage) { ";

    if (items.backgroundColour != '') cssString += "background-color: " + items.backgroundColour + "; ";

    if(items.backgroundType == 'image') {
      cssString += "background-image: url(" + items.backgroundBase64 + "); "
      cssString += "background-attachment: fixed; "
      cssString += (items.backgroundTile ? "background-repeat: repeat; " : "background-repeat: no-repeat; ");
      cssString += (items.backgroundCover ? "background-size: cover" : "");
    }

    newCSSElement.innerHTML = cssString;
    document.body.appendChild(newCSSElement);
});
