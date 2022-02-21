/* nativedialogs.js */

let $ = (selector) => document.querySelector(selector);

let alert_button = $('#alert-button');
let confirm_button = $('#confirm-button');
let prompt_button = $('#prompt-button');
let safer_prompt_button = $('#safer-prompt-button');

let button_output = $('#button-output');

let confirm_output = expression => `The value returned by the confirm method is : ${expression}`;
let prompt_output = expression => `The value returned by the prompt method is : ${expression}`;
let prompt_negative_output = `User didn't enter anything`;

alert_button.addEventListener('click', () => {
    window.alert('Alert pressed!');
});

confirm_button.addEventListener('click', event => {
    let response = window.confirm('Do you confirm this?');
    let output = response ? 'OK' : 'Cancel';
    button_output.innerHTML = confirm_output(output);
});

prompt_button.addEventListener('click', event => {
    let response = window.prompt('What is your name?', 'Jim Bob');
    button_output.innerHTML = prompt_output(response);
});

safer_prompt_button.addEventListener('click', event => {
    let response = window.prompt('What is your name?', 'Jim Bob');
    let output = DOMPurify.sanitize(response);
    button_output.innerHTML = prompt_output(output);
});