/* methodtest.js */

let $ = (selector) => document.querySelector(selector);

let form;
let form_data_obj;
let form_data;

let post_button;
let get_button;
let put_button;
let delete_button;

let output;
let output_json;

const URL = 'https://httpbin.org';

function setFormData(){
    form_data_obj = new FormData(form);

    let date = new Date();

    form_data_obj.append('article_date', date);

    form_data = Object.fromEntries(form_data_obj);
    console.log(form_data);
}

function postButtonClicked(){
    setFormData();
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', URL + '/' + 'post');
    xhr.send(form_data_obj);

    xhr.onload = () => checkStatusSetOutput(xhr);
    xhr.onerror = () => failedRequest();
}

function getButtonClicked(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL + '/' + 'get');
    xhr.send();

    xhr.onload = () => checkStatusSetOutput(xhr);
    xhr.onerror = () => failedRequest();
}

function putButtonClicked(){
    setFormData();

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', URL + '/' + 'put');
    xhr.send(form_data_obj);

    xhr.onload = () => checkStatusSetOutput(xhr);
    xhr.onerror = () => failedRequest();
}

function deleteButtonClicked(){
    setFormData();

    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', URL + '/' + 'delete');
    xhr.send(form_data_obj);

    xhr.onload = () => checkStatusSetOutput(xhr);
    xhr.onerror = () => failedRequest();
}

function checkStatusSetOutput(xhr){
    if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
        output_json.innerHTML = xhr.response;
    }
}

function failedRequest(){
    alert("Request failed");
}

window.addEventListener('DOMContentLoaded', ()=>{
    form = $('#method-test-form');

    post_button = $('#post-button');
    get_button = $('#get-button');
    put_button = $('#put-button');
    delete_button = $('#delete-button');

    output = $('#response');
    output_json = $('#json');

    post_button.onclick = () => postButtonClicked();
    get_button.onclick = () => getButtonClicked();
    put_button.onclick = () => putButtonClicked();
    delete_button.onclick = () => deleteButtonClicked();
});