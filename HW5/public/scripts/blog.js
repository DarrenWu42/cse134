/* blog.js */
let $ = (selector) => document.querySelector(selector);

let loggedIn = false;

let postListRef;

// declare variables for DOM elements
let actions_header;
let actions_row;
let table_body;
let sign_out_button;

let delete_dialog;
let delete_yes_button;
let delete_no_button; // never used

let create_update_dialog;
let form_post_title;
let form_post_summary;
let create_update_ok_button;
let create_update_cancel_button; //never used

let create_new_post_button;

let post_title;
let post_author;
let post_summary;

function createTableRow(post_id, post_info){
    let tr = table_body.insertRow(-1);

    for(let info of post_info){
        let th = tr.insertCell(-1);
        th.innerHTML = info;
    }

    tr.id = post_id;

    if(loggedIn){
        // create edit button
        let edit_cell = tr.insertCell(-1);
        let edit_icon = document.createElement('img');

        edit_icon.src = 'images/edit.svg';
        edit_icon.classList.add('clickable-image');
        edit_icon.onclick = () => updatePostDialog(post_id);

        edit_cell.appendChild(edit_icon);

        // create delete button
        let delete_cell = tr.insertCell(-1);
        let delete_icon = document.createElement('img');

        delete_icon.src = 'images/trash.svg';
        delete_icon.classList.add('clickable-image');
        delete_icon.onclick = () => deletePostDialog(post_id);

        delete_cell.appendChild(delete_icon);
    }
}

function updateTableRow(post_id, post_info){
    let cells = $('#' + post_id).cells;

    for(let i = 0; i < 4; i++){
        cells[i].innerHTML = post_info[i];
    }
}

function deleteTableRow(post_id){
    let row = $('#' + post_id);
    row.remove();
}

function createPostDialog(){
    // set new data and form data to empty
    post_title = form_post_title.value = '';
    post_summary = form_post_summary.value = '';

    // show create-update-dialog
    showDialog(create_update_dialog);

    // on ok, add new row to table and to posts_info
    create_update_ok_button.onclick = () => {
        let newPostRef = postListRef.push();

        let post_date = getCurrentDate();

        newPostRef.set({
            'title': post_title,
            'author': post_author,
            'date': post_date,
            'summary': post_summary
        });
    };
}

function updatePostDialog(post_id){
    let cells = $('#' + post_id).cells;

    // set new data and form data to old post data
    post_title = form_post_title.value = cells[0].innerHTML;
    post_summary = form_post_summary.value = cells[3].innerHTML;

    // show create-update-dialog
    showDialog(create_update_dialog);

    // on ok, perform update
    create_update_ok_button.onclick = () => {
        let postRef = postListRef.child(post_id);

        let post_date = getCurrentDate();

        postRef.set({
            'title': post_title,
            'author': post_author,
            'date': post_date,
            'summary': post_summary
        });
    };
}

function deletePostDialog(post_index){
    // show delete-dialog
    showDialog(delete_dialog);

    // on yes, perform delete
    delete_yes_button.onclick = () => {
        let postRef = postListRef.child(post_id);
        database.remove(postRef);
    };
}

function showDialog(dialog){
    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        window.alert("The <dialog> API is not supported by this browser");
    }
}

function signOutUser(){
    auth.signOut().then(() => {
        location.reload();
    }).catch((error) => {
        location.reload();
    });
}

function getCurrentDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}

window.addEventListener('DOMContentLoaded', ()=>{
    postListRef = database.ref('posts');

    // retrieve DOM elements
    actions_header = $('#actions-header');
    actions_row = $('#actions-row');
    table_body = $('#crud-table-body');
    sign_out_button = $('#sign-out-button');

    delete_dialog = $('#delete-dialog');
    delete_yes_button = $('#delete-yes-button');
    delete_no_button = $('#delete-no-button');

    create_update_dialog = $('#create-update-dialog');
    form_post_title = $('#post-title');
    form_post_summary = $('#post-summary');
    create_update_ok_button = $('#create-update-ok-button');
    create_update_cancel_button = $('#create-update-cancel-button');

    create_new_post_button = $('#create-new-post-button');

    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            post_author = user.email;
            loggedIn = true;

            $('#firebaseui-auth-container').remove();
            $('#loader').remove();
        } else {
            post_author = '';

            loggedIn = false;

            actions_header.remove();
            actions_row.remove();
            create_new_post_button.remove();
            sign_out_button.remove();
        }
    });

    // setting up database callbacks
    postListRef.on('child_added', (data) => {
        console.log(data.key, ':{', data.val(), '\n}');
        createTableRow(data.key, [data.val().title, data.val().author, data.val().date, data.val().summary]);
    });
      
    postListRef.on('child_changed', (data) => {
        updateTableRow(data.key, [data.val().title, data.val().author, data.val().date, data.val().summary]);
    });
      
    postListRef.on('child_removed', (data) => {
        deleteTableRow(data.key);
    });
    
    // create update value on change event listeners
    form_post_title.addEventListener('change', () => {
        post_title = DOMPurify.sanitize(form_post_title.value);
    });

    form_post_summary.addEventListener('change', () => {
        post_summary = DOMPurify.sanitize(form_post_summary.value);
    });

    // onclick create new post
    create_new_post_button.onclick = () => createPostDialog();
    sign_out_button.onclick = () => signOutUser();
});

window.addEventListener('beforeunload', () => { 
    window.localStorage.setItem('posts_info', JSON.stringify(posts_info));
});