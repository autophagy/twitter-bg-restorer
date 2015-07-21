function save_options() {
  var bgURL = document.getElementById('bgURL').value;
  chrome.storage.sync.set({
    backgroundURL: bgURL
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'URL saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    backgroundURL: ''
  }, function(items) {
    document.getElementById('bgURL').value = items.backgroundURL;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
