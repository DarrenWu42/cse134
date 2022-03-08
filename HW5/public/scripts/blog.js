/* blog.js */

let $ = (selector) => document.querySelector(selector);

// declare variables for DOM elements
let table_body;
let table_rows;

let delete_dialog;
let delete_yes_button;
let delete_no_button; // never used

let create_update_dialog;
let form_post_title;
let form_post_date;
let form_post_summary;
let create_update_ok_button;
let create_update_cancel_button; //never used

let create_new_post_button;

// declare variables for code to use
let posts_info = [];
let cols = ['title', 'date', 'summary']; // use for making more efficient code

let post_title;
let post_date;
let post_summary;

let newButton = () => document.createElement('button');

function createTable(){
    table_body.innerHTML = ""; // make table blank
    for(let post_index in posts_info){
        createTableRow(post_index, posts_info[post_index]);
    }
}

function createTableRow(post_index, post_info){
    let tr = table_body.insertRow(-1);

    for(let key in post_info){
        let th = tr.insertCell(-1);
        th.innerHTML = post_info[key];
    }

    // create edit button
    let edit_cell = tr.insertCell(-1);
    let edit_button = newButton();

    edit_button.onclick = () => updatePostDialog(post_index);
    edit_button.innerHTML = "Edit";

    edit_cell.appendChild(edit_button);

    // create delete button
    let delete_cell = tr.insertCell(-1);
    let delete_button = newButton();

    delete_button.onclick = () => deletePostDialog(post_index);
    delete_button.innerHTML = "Delete";

    delete_cell.appendChild(delete_button);
}

function createPostDialog(){
    // set new data and form data to empty
    post_title = form_post_title.value = '';
    post_date = form_post_date.value = '';
    post_summary = form_post_summary.value = '';

    // show create-update-dialog
    showDialog(create_update_dialog);

    // on ok, add new row to table and to posts_info
    create_update_ok_button.onclick = () => {
        let post_info = {'title': post_title, 'date': post_date, 'summary': post_summary};
        posts_info.push(post_info);
        createTableRow(table_rows.length, post_info);
    };
}

function updatePostDialog(post_index){
    // retrieve post info
    let post_info = posts_info[post_index];

    // set new data and form data to old post data
    post_title = form_post_title.value = post_info.title;
    post_date = form_post_date.value = post_info.date;
    post_summary = form_post_summary.value = post_info.summary;

    // show create-update-dialog
    showDialog(create_update_dialog);

    // on ok, perform update
    create_update_ok_button.onclick = () => {
        let cells = table_rows[post_index].cells;
        post_info.title = cells[0].innerHTML = post_title;
        post_info.date = cells[1].innerHTML = post_date;
        post_info.summary = cells[2].innerHTML = post_summary;
    };
}

function deletePostDialog(post_index){
    // show delete-dialog
    showDialog(delete_dialog);

    // on yes, perform delete and remake table
    delete_yes_button.onclick = () => {
        posts_info.splice(post_index, 1);
        table_body.deleteRow(post_index);
        createTable();
    };
}

function showDialog(dialog){
    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        window.alert("The <dialog> API is not supported by this browser");
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    // retrieve DOM elements
    table_body = $('#crud-table-body');
    table_rows = table_body.rows;

    delete_dialog = $('#delete-dialog');
    delete_yes_button = $('#delete-yes-button');
    delete_no_button = $('#delete-no-button');

    create_update_dialog = $('#create-update-dialog');
    form_post_title = $('#post-title');
    form_post_date = $('#post-date');
    form_post_summary = $('#post-summary');
    create_update_ok_button = $('#create-update-ok-button');
    create_update_cancel_button = $('#create-update-cancel-button');

    create_new_post_button = $('#create-new-post-button');

    // retrieve posts info, if nothing in local storage then prefill, else get local storage
    posts_info = window.localStorage.getItem('posts_info') === null ? 
    [{"title":"OpenCV in Python","date":"4/5/2021","summary":"An exploration of the OpenCV Python library and its important functions."},
    {"title":"Multithreading with Discord.py","date":"5/3/2021","summary":"How to use Python multithreading to handle intensive calculations alongside Discord Python API"},] :
    JSON.parse(window.localStorage.getItem('posts_info'));
    
    // create update value on change event listeners
    form_post_title.addEventListener('change', () => {
        post_title = DOMPurify.sanitize(form_post_title.value);
    });

    form_post_date.addEventListener('change', () => {
        post_date = DOMPurify.sanitize(form_post_date.value);
    });

    form_post_summary.addEventListener('change', () => {
        post_summary = DOMPurify.sanitize(form_post_summary.value);
    });

    // onclick create new post
    create_new_post_button.onclick = () => createPostDialog();
    
    createTable();
});

window.addEventListener("beforeunload", () => { 
    window.localStorage.setItem('posts_info', JSON.stringify(posts_info));
});