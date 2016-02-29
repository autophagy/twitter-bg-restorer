function toggle_instructions() {
    var element = document.getElementById('instructions');
    if(element.style.display == 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

function toggle_user_specific() {
    var element = document.getElementById('user-specific-options');
    if (element.style.display == 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

function save_options() {
  var bgURL = document.getElementById('bgURL').value;
  var bgTile = document.getElementById('bgTile').checked;
  var bgColour = document.getElementById('bgColour').value;
  var bgType = document.getElementById('bgType').value;

  var userBgOptions = new Array();

  var status = document.getElementById('status');
  status.textContent = 'Saving...';

  $('#user-options .user-option').each(function() {
      username = $(this).find('input.username').val().trim();
      if(username != '') {
          uname = username;
          userImage = $(this).find('input.userimage').val().trim();
          userTile = $(this).find('input.usertile').is(':checked');
          userColour = $(this).find('input.usercolour').val().trim();
          userType = $(this).find('select.userbgtype').val().trim();

          var usrImage = new Image();
          usrImage.crossOrigin = 'Anonymous';
          usrImage.onload = function(){
            var canvas = document.createElement('CANVAS');
            var context = canvas.getContext('2d');

            canvas.height = this.height;
            canvas.width = this.width;
            context.drawImage(this, 0, 0);
            var userBase64 = canvas.toDataURL();
            canvas = null;
            userBgOptions.push([uname, userImage, userBase64, userTile, userColour, userType]);
            chrome.storage.local.set({
              userOptions: userBgOptions
            }, function() { });
          };
          usrImage.src = userImage;
      }
  });

  var image = new Image();
  image.crossOrigin = 'Anonymous';
  image.onload = function(){

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
      backgroundURL: bgURL,
      backgroundTile: bgTile,
      backgroundColour: bgColour,
      backgroundType: bgType
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  };
  image.src = bgURL;
}

function restore_options() {
  chrome.storage.sync.get({
    backgroundURL: '',
    backgroundTile: true,
    backgroundColour: '',
    backgroundType: 'image',
    userOptions: []
  }, function(items) {
    document.getElementById('bgURL').value = items.backgroundURL;
    document.getElementById('bgTile').checked = items.backgroundTile;
    document.getElementById('bgColour').value = items.backgroundColour;
    document.getElementById('bgType').value = items.backgroundType;

    chrome.storage.local.get({
      userOptions: []
    }, function(localItems) {
      for (var i in localItems.userOptions) {
          userOption = localItems.userOptions[i];
          add_user_row(userOption[0], userOption[1], userOption[3], userOption[4], userOption[5]);
      }

      add_user_row('', '', false, '', 'image');
    });

  });
}

function add_user_row(username, image, tile, colour, type) {
    var row = $('<div class="user-option">\
        @<input type="text" class="username"/>\
        <input type="text" class="userimage"/>\
        <input type="checkbox" class="usertile">\
        <input type="text" class="usercolour"/>\
        <select class="userbgtype">\
            <option value="image">Image</option>\
            <option value="colour">Colour</option>\
        </select>\
    </div>');

    row.find('input.username').val(username);
    row.find('input.userimage').val(image);
    row.find('input.usertile').prop('checked', tile);
    row.find('input.usercolour').val(colour);
    row.find('select.userbgtype').val(type);

    $('#user-options').append(row);
}

function remove_user_row() {
    $('#user-options .user-option:last-child').remove();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('instruction-button').addEventListener('click', toggle_instructions);

document.getElementById('user-specific-button').addEventListener('click', toggle_user_specific);
document.getElementById('add').addEventListener('click', function(){
    add_user_row('','',false,'','image');
});
document.getElementById('remove').addEventListener('click', remove_user_row);
