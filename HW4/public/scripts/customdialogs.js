/* customdialogs.js */

window.addEventListener('DOMContentLoaded', () => {
    let $ = (selector) => document.querySelector(selector);

    let alert_button = $('#alert-button');
    let confirm_button = $('#confirm-button');
    let prompt_button = $('#prompt-button');

    let alert_dialog = $('#alert-dialog');
    let confirm_dialog = $('#confirm-dialog');
    let prompt_dialog = $('#prompt-dialog');

    let input_first_name = $('#first-name');
    let prompt_ok_button = $('#prompt-ok-button');

    let button_output = $('#button-output');

    let confirm_output = expression => `The value returned by the confirm method is : ${expression}`;
    let prompt_output = expression => `The value returned by the prompt method is : ${expression}`;
    let prompt_negative_output = `User didn't enter anything`;

    alert_button.addEventListener('click', function onOpen() {
        if (typeof alert_dialog.showModal === "function") {
            alert_dialog.showModal();
        } else {
        alert("The <dialog> API is not supported by this browser");
        }
    });

    confirm_button.addEventListener('click', () => {
        if (typeof confirm_dialog.showModal === "function") {
            confirm_dialog.showModal();
        } else {
        alert("The <dialog> API is not supported by this browser");
        }
    });

    prompt_button.addEventListener('click', () => {
        if (typeof prompt_dialog.showModal === "function") {
            prompt_dialog.showModal();
        } else {
        alert("The <dialog> API is not supported by this browser");
        }
    });

    input_first_name.addEventListener('change', () => {
        prompt_ok_button.value = input_first_name.value;
    });

    confirm_dialog.addEventListener('close', () => {
        button_output.innerHTML = confirm_output(confirm_dialog.returnValue);
    });

    prompt_dialog.addEventListener('close', () => {
        let output = DOMPurify.sanitize(prompt_dialog.returnValue);
        button_output.innerHTML = output.length == 0 ? prompt_negative_output : prompt_output(output);
    });
});