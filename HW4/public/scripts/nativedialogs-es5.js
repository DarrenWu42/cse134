/* nativedialogs-es5.js */
/* jslint node: true */

'use strict';

var alert_button = document.getElementById('alert-button');
var confirm_button = document.getElementById('confirm-button');
var prompt_button = document.getElementById('prompt-button');
var safer_prompt_button = document.getElementById('safer-prompt-button');

alert_button.addEventListener('click', event => {
    window.alert();
});

confirm_button.addEventListener('click', event => {
    window.confirm();
});

prompt_button.addEventListener('click', event => {
    window.prompt();
});

safer_prompt_button.addEventListener('click', event => {
    window.alert();
});
  