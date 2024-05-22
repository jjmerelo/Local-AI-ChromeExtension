document.getElementById('summarizeButton').addEventListener('click', () => {
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'block'; // Show the spinner
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let activeTab = tabs[0];
        let activeTabUrl = activeTab.url;

        if (activeTabUrl.startsWith('http://') || activeTabUrl.startsWith('https://')) {
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: summarizePage,
            });
        } else {
            alert('This extension cannot run on this URL.');
            spinner.style.display = 'none'; // Hide the spinner
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const spinner = document.getElementById('loadingSpinner');
    if (message.action === 'displaySummary') {
        document.getElementById('summary').textContent = message.summary;
        spinner.style.display = 'none'; // Hide the spinner
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
                            content: 'Summarize the following detailed information into a concise yet comprehensive summary, focusing on key points and important details. Avoid adding introductory or concluding remarks such as "Here is a summary:"' + pageContent
                        }
                    ]
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
