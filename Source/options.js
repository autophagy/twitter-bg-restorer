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
}

function restore_options() {
  chrome.storage.sync.get({
    backgroundURL: '',
    backgroundTile: true,
    backgroundColour: '',
    backgroundType: 'image'
  }, function(items) {
    document.getElementById('bgURL').value = items.backgroundURL;
    document.getElementById('bgTile').checked = items.backgroundTile;
    document.getElementById('bgColour').value = items.backgroundColour;
    document.getElementById('bgType').value = items.backgroundType;
  });
}

function add_user_row() {
    $('#user-options').append('<div class="user-option">\
        @<input type="text" class="username"/>\
        <input type="text" class="userimage"/>\
        <input type="text" class="usercolour"/>\
        <select class="userBgType">\
            <option value="image">Image</option>\
            <option value="colour">Colour</option>\
        </select>\
    </div>')
}

function remove_user_row() {
    $('#user-options .user-option:last-child').remove();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('instruction-button').addEventListener('click', toggle_instructions);

document.getElementById('user-specific-button').addEventListener('click', toggle_user_specific);
document.getElementById('add').addEventListener('click', add_user_row);
document.getElementById('remove').addEventListener('click', remove_user_row);
