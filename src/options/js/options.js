function toggle_instructions() {
    var element = document.getElementById('instructions');
    if(element.style.display == 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

function save_options() {

  var bgTile = document.getElementById('bgTile').checked;
  var bgColour = document.getElementById('bgColour').value;
  var bgType = document.getElementById('bgType').value;

  var userBgOptions = new Array();

  var status = document.getElementById('save-button');
  status.textContent = 'Saving...';

  var input = document.getElementById('imageFile');
  file = input.files[0];

  if(file) {
    save_new_file(file, bgTile, bgColour, bgType);
  } else {
    chrome.storage.local.get({
      backgroundBase64: ''
    }, function(localItems) {

      if (!(localItems.backgroundBase64 == '' || localItems.backgroundBase64 == undefined)) {
        set_chrome_storage(localItems.backgroundBase64, '', bgTile, bgColour, bgType);
      } else {
        set_chrome_storage('', '', bgTile, bgColour, bgType);
      }
    });
  }
}

function save_new_file(file, bgTile, bgColour, bgType) {
  fileReader = new FileReader();
  fileReader.onload = function() {
    var image = new Image();
    image.onload = function() {
      var canvas = document.createElement('CANVAS');
      var context = canvas.getContext('2d');

      canvas.height = this.height;
      canvas.width = this.width;
      context.drawImage(this, 0, 0);
      var bgBase64 = canvas.toDataURL();
      canvas = null;

      set_chrome_storage(bgBase64, file.name, bgTile, bgColour, bgType);
    }
    image.src = fileReader.result;
  }
  fileReader.readAsDataURL(file);
}

function set_chrome_storage(bgBase64, bgURL, bgTile, bgColour, bgType) {
  chrome.storage.local.set({
    backgroundBase64: bgBase64
  }, function() { });

  chrome.storage.sync.set({
    backgroundURL: bgURL,
    backgroundTile: bgTile,
    backgroundColour: bgColour,
    backgroundType: bgType
  }, function() {
    var status = document.getElementById('save-button');
    status.textContent = 'Saved';
    restore_options();
    setTimeout(function() {
      status.textContent = 'Save';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    backgroundURL: '',
    backgroundTile: true,
    backgroundColour: '',
    backgroundType: 'image'
  }, function(items) {
    document.getElementById('imageFile').title = items.backgroundURL;
    document.getElementById('bgTile').checked = items.backgroundTile;
    document.getElementById('bgColour').value = items.backgroundColour;
    document.getElementById('bgType').value = items.backgroundType;

    chrome.storage.local.get({
      backgroundBase64: ''
    }, function(localItems) {

      if (!(localItems.backgroundBase64 == '' || localItems.backgroundBase64 == undefined)) {
        var canvas = document.getElementById('currentBG');
        var context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        var image = new Image();
        image.onload = function() {
          context.drawImage(image, 0, 0);
        }
        image.src = localItems.backgroundBase64;
      }
    });

  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save-button').addEventListener('click',
    save_options);
document.getElementById('instructions-button').addEventListener('click', toggle_instructions);
