/* nativedialogs.js */

window.addEventListener('DOMContentLoaded', () => {
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

    confirm_button.addEventListener('click', () => {
        let response = window.confirm('Do you confirm this?');
        button_output.innerHTML = confirm_output(response);
    });

    prompt_button.addEventListener('click', () => {
        let response = window.prompt('What is your name?', 'Jim Bob');
        button_output.innerHTML = response == null || response.length == 0 ? 
                                    prompt_negative_output : prompt_output(response);
    });

    safer_prompt_button.addEventListener('click', () => {
        let response = window.prompt('What is your name?', 'Jim Bob');
        let output = DOMPurify.sanitize(response);
        button_output.innerHTML = response == null || output.length == 0 ? 
                                    prompt_negative_output : prompt_output(output);
    });
});