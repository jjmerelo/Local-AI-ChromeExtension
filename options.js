document.getElementById('save').addEventListener('click', () => {
    const aiUrl = document.getElementById('ai-url').value;
    chrome.storage.sync.set({ aiUrl }, () => {
      alert('Settings saved!');
    });
  });
  
  // Load saved settings
  chrome.storage.sync.get('aiUrl', (data) => {
    if (data.aiUrl) {
      document.getElementById('ai-url').value = data.aiUrl;
    }
  });
  
