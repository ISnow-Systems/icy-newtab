chrome.runtime.onMessage.addListener((m,s,r) => {
  switch (m) {
    case "getTheme":
      chrome.storage.sync.get(['isDark']).then(v=>{
        r(v.isDark);
      });
      break;
    case "setDark":
      chrome.storage.sync.set({isDark: true});
      break;
    case "setLight":
      chrome.storage.sync.set({isDark: false});
      break;
    case "switchTheme":
      chrome.storage.sync.get(['isDark']).then(v=>{
        chrome.storage.sync.set({isDark: !v.isDark});
      });
      break;
  }
})
