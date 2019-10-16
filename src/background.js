'use strict';

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        chrome.pageAction.show(tabId);
        const dbRequest = indexedDB.open('firebaseLocalStorageDb', 1);
        
        dbRequest.onsuccess = () => {
            const db = dbRequest.result;
            try {
                db.transaction(['firebaseLocalStorage'], 'readonly');

            } catch (e) {
                chrome.pageAction.hide(tabId);
            }
        }

        dbRequest.onupgradeneeded = function (e) {
            e.target.transaction.abort();
        }
    });
