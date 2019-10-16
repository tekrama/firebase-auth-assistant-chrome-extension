const idTokenInput = document.getElementById('idTokenInput');

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'getIdToken', {}, function (response) {
        idTokenInput.value = response.token;
    });
});

const copyIdTokenButton = document.getElementById('copyIdTokenButton');

copyIdTokenButton.onclick = function () {
    var copy = function (e) {
        e.preventDefault();
        if (e.clipboardData) {
            e.clipboardData.setData('text/plain', idTokenInput.value);
        } else if (window.clipboardData) {
            window.clipboardData.setData('Text', idTokenInput.value);
        }
    }
    window.addEventListener('copy', copy);
    document.execCommand('copy');
    window.removeEventListener('copy', copy);
}
