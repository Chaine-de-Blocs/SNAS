// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function getTrustedURI() {
  const trustedEndpoints = [
    'https://cryptoblocs.fr/assets/scamscan.json',
  ];

  return trustedEndpoints[Math.floor(Math.random() * Math.floor(trustedEndpoints.length - 1))];
}

// Updates the list everytime the user opens Chrome
function updateList() {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.open('GET', getTrustedURI(), true);
  xhr.onload = function(e) {
    // No results, check with another host
    if (!this.response || JSON.stringify(this.response) === JSON.stringify({})) {
      updateList();
      return;
    }

    chrome.storage.sync.set({scamscan: this.response});
  };

  xhr.onerror = function(err) {
    console.log(err);
    updateList();
  }

  xhr.send();
}


chrome.windows.onCreated.addListener(function() {
  updateList();
});

chrome.runtime.onInstalled.addListener(function() {
  updateList();

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get('scamscan', function(data) {
      const url = new URL(tab.url);

      const scam = data.scamscan[url.hostname] ||
        // Checks without subdomain
        data.scamscan[url.hostname.split('.').slice(1).join('.')];

      if (scam) {
        chrome.tabs.sendMessage(tabId, {scam, id: tabId});
      }
    });
  });
});
