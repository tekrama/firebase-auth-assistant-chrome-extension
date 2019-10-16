chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message === 'getIdToken'){
            var dbRequest = indexedDB.open('firebaseLocalStorageDb', 1);
    
            dbRequest.onsuccess = () => {
                const db = dbRequest.result;
                const transaction = db.transaction(['firebaseLocalStorage'], 'readonly');
                const store = transaction.objectStore('firebaseLocalStorage');
                const getCursorRequest = store.openCursor();
                getCursorRequest.onsuccess = e => {
                    const token = e.target.result.value.value.stsTokenManager.accessToken;
                    sendResponse({ token: token });
                }
            }

            return true;
        }
    });
