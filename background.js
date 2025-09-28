// Background script for the Chrome extension
chrome.runtime.onInstalled.addListener(function(details) {
  console.log('Simple Chrome Extension installed!');
  
  // Set up initial storage
  chrome.storage.local.set({
    clickCount: 0,
    installDate: new Date().toISOString()
  });
});

// Handle extension icon click
chrome.action.onClicked.addListener(function(tab) {
  console.log('Extension icon clicked on tab:', tab.url);
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getPageInfo') {
    sendResponse({
      url: sender.tab.url,
      title: sender.tab.title,
      timestamp: new Date().toISOString()
    });
  }
});

// Handle tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('Tab updated:', tab.url);
  }
});
