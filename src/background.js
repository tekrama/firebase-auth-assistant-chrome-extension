'use strict';

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            chrome.storage.sync.get({
                urlPatterns: ''
            }, function(items) {
                const urlPatterns = items.urlPatterns.replace(/ /g, '').replace(/\n+/g, '').split(',');

                urlPatterns.forEach(urlPattern => {
                    if (tab.url.match(urlPattern)){
                        chrome.pageAction.show(tabId);
                    }
                });
            });
        }
    });
