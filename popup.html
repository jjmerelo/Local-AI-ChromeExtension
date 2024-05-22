document.addEventListener('DOMContentLoaded', () => {
    runSummarize();
});

function runSummarize(promptType = 'initial') {
    const spinner = document.getElementById('loadingSpinner');
    const responseButtons = document.querySelector('.response-buttons');
    const summaryDiv = document.getElementById('summary');

    spinner.style.display = 'block'; // Show the spinner
    responseButtons.style.display = 'none'; // Hide buttons
    summaryDiv.textContent = ''; // Clear previous summary

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let activeTab = tabs[0];
        let activeTabUrl = activeTab.url;

        if (activeTabUrl.startsWith('http://') || activeTabUrl.startsWith('https://')) {
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: summarizePage,
                args: [promptType]
            });
        } else {
            alert('This extension cannot run on this URL.');
            spinner.style.display = 'none'; // Hide the spinner
        }
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const spinner = document.getElementById('loadingSpinner');
    if (message.action === 'displaySummary') {
        document.getElementById('summary').textContent = message.summary;
        spinner.style.display = 'none'; // Hide the spinner
        document.querySelector('.response-buttons').style.display = 'block'; // Show buttons
    }
});

document.getElementById('retryButton').addEventListener('click', () => {
    runSummarize('initial'); // Run the initial summarize function
});

document.getElementById('shorterButton').addEventListener('click', () => {
    runSummarize('shorter'); // Run the summarize function with shorter prompt
});

document.getElementById('longerButton').addEventListener('click', () => {
    runSummarize('longer'); // Run the summarize function with longer prompt
});

async function summarizePage(promptType) {
    const pageContent = document.body.innerText;
    let prompt;

    switch(promptType) {
        case 'shorter':
            prompt = 'Give me a very short TLDR summary. Start your reply with "Here is a TLDR summary:". Here is the content: ';
            break;
        case 'longer':
            prompt = 'Regenerate a detailed summary focusing on different aspects. Start your reply with "Here is a thorough summary:". Give me a section for: Summary, Key Points, Perspective. Here is the content: ';
            break;
        default:
            prompt = 'Summarize the following detailed information into a concise yet comprehensive summary, focusing on key points and important details. No longer than 2 paragraphs. Start your reply with "Here is a summary:". Here is the content: ';
    }

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
                            content: prompt + pageContent
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
