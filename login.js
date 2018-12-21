(function() {
    'use strict';

    const url = chrome.runtime.getURL('.env');

    let userInput = undefined;
    let passInput = undefined;
    let submitButton = undefined;

    let waitForLoad = new Promise(function(resolve, reject) {
        let tries = 0;
        let loop = setInterval(function() {
            tries++;
            userInput = document.getElementsByName('userIdentifier')[0];
            passInput = document.getElementsByName('password')[0];

            if (userInput !== undefined && passInput !== undefined) {
                submitButton = userInput.parentElement.parentElement.getElementsByTagName("button")[0];
                clearInterval(loop);
                resolve();
                return;
            }

            if (tries > 10) {
                console.log("Unable to find elements after 10 tries..");
                clearInterval(loop);
                reject();
            }
        }, 200);
    });

    function updateValue(input, data) {
        // Works with redux-form (react)
        let evt = new Event("input", { bubbles: true });
        evt.simulated = true;
        input.value = data;
        input.dispatchEvent(evt);
    }

    function initiateLogin(user, pass) {
        userInput.style.border = "3px solid green";
        passInput.style.border = "3px solid green";
        submitButton.style.border = "3px solid green";

        updateValue(userInput, user);
        updateValue(passInput, pass);

        // Give it some time to process input
        //  events before clicking submit.
        setTimeout(function() {
            submitButton.click();
        }, 100);
    }

    function login(data) {
        waitForLoad.then(function() {
            initiateLogin(data.user, data.pass)
        });
    }

    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then(login);

})();
