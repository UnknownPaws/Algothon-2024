// ==UserScript==
// @name         Auto Fill and Submit Google Form
// @namespace    http://tampermonkey.net/
// @version      2024-11-16
// @description  Automatically fills and submits a Google Form based on an update from the server
// @author       You
// @match        https://docs.google.com/forms/d/e/1FA******NrQ/viewform
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    // Function to fill out the form and submit it
    function fillAndSubmitForm(responseText) {
        console.log('Filling form with response:', responseText);

        // Select and click the checkbox (if required)
        const checkboxXPath = '/html/body/div/div[2]/form/div[2]/div/div[2]/div[1]/div[1]/label/div/div[1]';
        const checkbox = document.evaluate(
            checkboxXPath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (checkbox) {
            checkbox.click();
            console.log('Checkbox clicked.');
        } else {
            console.error('Checkbox not found.');
        }

        // Enter the response into the textarea
        const textareaXPath = '/html/body/div/div[2]/form/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div[1]/div[2]/textarea';
        const textarea = document.evaluate(
            textareaXPath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (textarea) {
            textarea.value = responseText;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            console.log('Response entered.');
        } else {
            console.error('Textarea not found.');
        }

        // Submit the form
        const submitXPath = '/html/body/div/div[2]/form/div[2]/div/div[3]/div[1]/div[1]/div';
        const submitButton = document.evaluate(
            submitXPath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (submitButton) {
            console.log('Form submitting.');
            submitButton.click();
        } else {
            console.error('Submit button not found.');
        }
    }

    // Function to fetch data from the server and trigger form submission
    function fetchDataAndSubmit() {
        console.log('Fetching data from server...');
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://localhost:5000/answer.txt', // Your server URL here
            onload: (response) => {
                const responseText = response.responseText; // Assuming the response is just text
                fillAndSubmitForm(responseText); // Call the fill and submit function with the data
            },
            onerror: () => {
                console.error('Failed to fetch data from the API.');
            },
        });
    }

    // Fetch data and submit the form every time an update is sent from the server
    setTimeout(() => {
        fetchDataAndSubmit();
    }, 10000); // Adjust interval time as needed (almost 19 mins)
})();
