chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarize",
    title: "Summarize with localAI",
    contexts: ["page", "selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarize") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: summarizePage,
    });
  }
});

async function summarizePage() {
  const pageContent = document.body.innerText;
  chrome.storage.sync.get('aiUrl', async (data) => {
    if (!data.aiUrl) {
      alert('Please set the local AI URL in the extension options.');
      return;
    }

    try {
      let response = await fetch(`${data.aiUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '' // You can leave this part empty for now
        },
        body: JSON.stringify({
            model: 'llama2',
            messages: [
                {
                    role: 'user',
                    content: pageContent
                }
            ],
        })
      });

      if (response.ok) {
        let result = await response.json();
        let summary = result.choices[0].message.content; // Assuming the correct response format
        chrome.runtime.sendMessage({ action: 'displaySummary', summary: summary });
      } else {
        chrome.runtime.sendMessage({ action: 'displaySummary', summary: 'Error: Unable to summarize the content.' });
      }
    } catch (error) {
      chrome.runtime.sendMessage({ action: 'displaySummary', summary: 'Error: Unable to summarize the content.' });
    }
  });
}
