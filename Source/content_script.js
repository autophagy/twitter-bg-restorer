var body = document.getElementsByTagName('body')[0];
chrome.storage.sync.get({
  backgroundURL: ''
}, function(items) {
  body.style.backgroundImage = 'url(' + items.backgroundURL + ')';
});
