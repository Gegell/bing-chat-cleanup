// ==UserScript==
// @name         Bing AI Chat Cleanup
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Centers the bing AI chat box, and remove some of the welcoming clutter text.
// @author       Gegell
// @match        https://www.bing.com/*search?q=Bing+AI*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @updateURL    https://raw.githubusercontent.com/Gegell/bing-chat-cleanup/main/bing-chat-cleanup.user.js
// @downloadURL  https://raw.githubusercontent.com/Gegell/bing-chat-cleanup/main/bing-chat-cleanup.user.js
// @supportURL   https://github.com/Gegell/bing-chat-cleanup/issues
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Select the body element
    const body = document.querySelector('body');

    // Create a new MutationObserver instance
    const observer = new MutationObserver((mutations) => {
        // Check each mutation that was observed
        mutations.forEach((mutation) => {
            // Check if the cib-serp element was added to the body (e.g. the chat body)
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                const cibSerpElement = Array.from(mutation.addedNodes).find((node) => node.classList?.contains('cib-serp-main'));
                if (cibSerpElement) {
                    // Set the alignment property of the cib-serp element to center (center chat)
                    cibSerpElement.alignment = 'center';

                    // Remove some of the prompt examples and the learn together text (navigate through the shadow DOMs)
                    const conversation = cibSerpElement.shadowRoot.querySelector("cib-conversation");
                    const welcome = conversation.shadowRoot.querySelector("cib-welcome-container");

                    // Sample promts
                    welcome.shadowRoot.querySelector(".container-item").remove();
                    // Learn together string
                    welcome.shadowRoot.querySelector(".learn-tog-item").remove();
                    // Remove some of the margin
                    welcome.shadowRoot.querySelector(".privacy-statement").style.marginTop = "0";

                    // Stop observing mutations
                    observer.disconnect();
                }
            }
        });
    });

    // Start observing mutations to the body element
    observer.observe(body, { childList: true, subtree: true });
})();
