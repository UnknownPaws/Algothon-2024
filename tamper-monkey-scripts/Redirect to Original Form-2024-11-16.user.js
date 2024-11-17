// ==UserScript==
// @name         Redirect to Original Form
// @namespace    http://tampermonkey.net/
// @version      2024-11-16
// @description  Redirects to the original Google Form after 20 seconds on the "Submit Another Response" page
// @author       You
// @match        https://docs.google.com/forms/u/0/d/e/1FA******NrQ/formResponse
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Wait for 20 seconds, then redirect to the original form
    setTimeout(() => {
        console.log('Redirecting to the original form...');
        window.location.href = 'https://docs.google.com/forms/d/e/1FA*******NrQ/viewform';
    }, 1130000); // almost 19 min delay before redirecting
})();
