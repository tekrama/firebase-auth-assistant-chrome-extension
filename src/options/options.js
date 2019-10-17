function save_options() {
    var urlPatterns = document.getElementById('url-patterns').value;
    chrome.storage.sync.set({
        urlPatterns: urlPatterns,
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
    });
  }
  
  function restore_options() {
    chrome.storage.sync.get({
        urlPatterns: ''
    }, function(items) {
      document.getElementById('url-patterns').value = items.urlPatterns;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);
