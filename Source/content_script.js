var body = document.getElementsByTagName('body')[0];
chrome.storage.sync.get({
    backgroundURL: '',
    backgroundTile: true,
    backgroundColour: '',
    backgroundType: 'image',
    userOptions: []
}, function(items) {

    var css = document.createElement("style");
    css.type = "text/css";
    var cssString = "body:not(.PermalinkPage) { ";

    bgURL = items.backgroundURL;
    bgTile = items.backgroundTile;
    bgColour = items.backgroundColour;
    bgType = items.backgroundType;

    for (var i in items.userOptions) {
        userOption = items.userOptions[i];
        if(document.getElementsByClassName('user-style-' + userOption[0])[0] != null) {
            bgURL = userOption[1];
            bgTile = userOption[2];
            bgColour = userOption[3];
            bgType = userOption[4];
        }
    }

    if(bgColour != '')
    {
        cssString += "background-color: " + bgColour + "; ";
    }

    if(bgType == 'image') {
        cssString += "background-image: url(" + bgURL + "); "
        cssString += "background-attachment: fixed; "
        if(bgTile) {
            cssString += "background-repeat: repeat; "
        } else {
            cssString += "background-repeat: no-repeat; "
        }
    }

    css.innerHTML = cssString;
    document.body.appendChild(css);
});
