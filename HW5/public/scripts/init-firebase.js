var firebaseConfig = {
    apiKey: "AIzaSyDG4CRmraLOBe6b64j1mxTE8szMos-o3Ms",
    authDomain: "cse134hw5-4242dwu.firebaseapp.com",
    databaseURL: "cse134hw5-4242dwu-default-rtdb.firebaseio.com/",
    projectId: "cse134hw5-4242dwu",
    storageBucket: "cse134hw5-4242dwu.appspot.com",
    messagingSenderId: "750287127588",
    appId: "1:750287127588:web:53e253cd288579aaea44b1",
    measurementId: "G-6NWJ8QSS4R"
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();
const database = firebase.database();

var ui = new firebaseui.auth.AuthUI(auth);
var uiConfig = {
    callbacks: {
        uiShown: function() {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        }
    ],
    signInSuccessUrl: './crud.html'
};
ui.start('#firebaseui-auth-container', uiConfig);