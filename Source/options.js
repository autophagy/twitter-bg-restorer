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

  var status = document.getElementById('status');
  status.textContent = 'Saving...';

  var input = document.getElementById('imageFile');
  file = input.files[0];
  if(file) {
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

        chrome.storage.local.set({
          backgroundBase64: bgBase64
        }, function() { });

        chrome.storage.sync.set({
          backgroundURL: file.name,
          backgroundTile: bgTile,
          backgroundColour: bgColour,
          backgroundType: bgType
        }, function() {
          var status = document.getElementById('status');
          status.textContent = 'Options saved.';
          restore_options();
          setTimeout(function() {
            status.textContent = '';
          }, 750);
        });
      }
      image.src = fileReader.result;
    }
    fileReader.readAsDataURL(file);
  } else {
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  }
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
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('instruction-button').addEventListener('click', toggle_instructions);
