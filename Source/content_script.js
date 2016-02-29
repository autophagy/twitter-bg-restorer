var body = document.getElementsByTagName('body')[0];
chrome.storage.sync.get({
    backgroundURL: '',
    backgroundTile: true,
    backgroundColour: '',
    backgroundType: 'image',
}, function(items) {
    chrome.storage.local.get({
      backgroundBase64: '',
      userOptions: []
    }, function(localItems) {
      bgBase64 = localItems.backgroundBase64;

      var css = document.createElement("style");
      css.type = "text/css";
      var cssString = "body:not(.PermalinkPage) { ";

      bgURL = items.backgroundURL;
      bgTile = items.backgroundTile;
      bgColour = items.backgroundColour;
      bgType = items.backgroundType;

      for (var i in localItems.userOptions) {
          userOption = localItems.userOptions[i];
          if(document.getElementsByClassName('user-style-' + userOption[0])[0] != null) {
              bgURL = userOption[1];
              bgBase64 = userOption[2];
              bgTile = userOption[3];
              bgColour = userOption[4];
              bgType = userOption[5];
          }
      }

      if(bgColour != '')
      {
          cssString += "background-color: " + bgColour + "; ";
      }

      if(bgType == 'image') {
          // Old legacy checking
          if (bgBase64 == '' || bgBase64 == undefined) {
            cssString += "background-image: url(" + bgURL + "); "
          } else {
            cssString += "background-image: url(" + bgBase64 + "); "
          }
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
});
