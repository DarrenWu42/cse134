/* nativedialogs.js */

let $ = (selector) => document.querySelector(selector);

const name = $('#name-input').value;

const alert_button = $('alert-button');
const confirm_button = $('confirm-button');
const prompt_button = $('prompt-button');
const safer_prompt_button = $('safer-prompt-button');

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