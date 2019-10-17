chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message === 'getIdToken'){
            var dbRequest = indexedDB.open('firebaseLocalStorageDb', 1);
    
            dbRequest.onsuccess = () => {
                const db = dbRequest.result;
                try {
                    const transaction = db.transaction(['firebaseLocalStorage'], 'readonly');
                    const store = transaction.objectStore('firebaseLocalStorage');
                    const getCursorRequest = store.openCursor();
                    getCursorRequest.onsuccess = e => {
                        let token = '';
                        if (e.target.result) {
                            token = e.target.result.value.value.stsTokenManager.accessToken;
                        }
                        sendResponse({ token: token });
                    }
                } catch (e) {
                    sendResponse({ token: '' });
                }
            }

            return true;
        }
    });
