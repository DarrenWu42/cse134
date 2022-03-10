/* methodtest.js */

let $ = (selector) => document.querySelector(selector);

let form;
let form_data;

let post_button;
let get_button;
let put_button;
let delete_button;

let output;

function retrieveFormData(){
    form_data = Object.fromEntries(new FormData(form));
    console.log(form_data);
}

function postButtonClicked(){
    retrieveFormData();
}

function getButtonClicked(){

}

function putButtonClicked(){
    retrieveFormData();
}

function deleteButtonClicked(){
    retrieveFormData();
}

window.addEventListener('DOMContentLoaded', ()=>{
    form = $('#method-test-form');

    post_button = $('#post-button');
    get_button = $('#get-button');
    put_button = $('#put-button');
    delete_button = $('#delete-button');

    output = $('#response');

    post_button.onclick = () => postButtonClicked();
});