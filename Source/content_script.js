var body = document.getElementsByTagName('body')[0];
chrome.storage.sync.get({
    backgroundURL: '',
    backgroundTile: true,
    backgroundColour: '',
    backgroundType: 'image'
}, function(items) {
    if(items.backgroundType == 'image') {
        body.style.backgroundImage = 'url(' + items.backgroundURL + ')';
        body.style.backgroundAttachment = 'fixed';
        if(items.backgroundTile) {
            body.style.backgroundRepeat = 'repeat';
        } else {
            body.style.backgroundRepeat = 'no-repeat';
        }
    } else {
        body.style.backgroundColor = items.backgroundColour;
    }
});
