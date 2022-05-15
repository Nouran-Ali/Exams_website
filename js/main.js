const signUpButton = document.getElementById('signup');
const signInButton = document.getElementById('signin');
const container = document.getElementById('container');
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
var password = document.getElementById('password');
var rePassword = document.getElementById('rePassword');
password.oninput = function () {
    password = document.getElementById('password');

    if (password.value.length < 8) {
        password.classList.add("errorsign");
    } else {
        password.classList.add("noerrorsign");
    }
};
rePassword.oninput = function () {
    rePassword = document.getElementById('rePassword');
    if (rePassword.value.length < 8) {
        rePassword.classList.add("errorsign");
    } else {
        rePassword.classList.add("noerrorsign");
    }
};
var password = document.getElementById('password');
var rePassword = document.getElementById('rePassword');
rePassword.onkeyup = function () {
    password = document.getElementById('password');
    rePassword = document.getElementById('rePassword');
    if (password.value != rePassword.value) {
        password.classList.add("errorsign");
        rePassword.classList.add("errorsign");
        password.classList.remove("noerrorsign");
        rePassword.classList.remove("noerrorsign");
        document.getElementById('errorMessage').innerHTML = 'Passwords are not match';
    } else {
        password.classList.add("noerrorsign");
        rePassword.classList.add("noerrorsign");
        password.classList.remove("errorsign");
        rePassword.classList.remove("errorsign");
        document.getElementById('errorMessage').innerHTML = '';
    }
};
var fname = document.getElementById('fname');
fname.oninput = function () {
    fname = document.getElementById('fname');
    if (fname.value.length <2) {
        fname.classList.add("errorsign");
        fname.classList.remove("noerrorsign");
    } else {
        fname.classList.add("noerrorsign");
        fname.classList.remove("errorsign");
    }
}
var lname = document.getElementById('lname');
lname.oninput = function () {
    lname = document.getElementById('lname');
    if (lname.value.length < 2) {
        lname.classList.add("errorsign");
        lname.classList.remove("noerrorsign");
    } else {
        lname.classList.add("noerrorsign");
        lname.classList.remove("errorsign");
    }
}
var email = document.getElementById('email');
email.oninput = function(){
    email = document.getElementById('email');
    var at = document.getElementById("email").value.indexOf("@");
    if (at == -1) {
        email.classList.add("errorsign");
        email.classList.remove("noerrorsign");
    } else {
        email.classList.add("noerrorsign");
        email.classList.remove("errorsign");
    }
}
var firebaseConfig = {
    apiKey: "AIzaSyCU9KrtN3Pk72AF9YvY_yAavU4f2iSiJEM",
    authDomain: "form-a0764.firebaseapp.com",
    projectId: "form-a0764",
    storageBucket: "form-a0764.appspot.com",
    messagingSenderId: "842786566610",
    appId: "1:842786566610:web:6c4196f5f8fd9875b1580b"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function signUp() {
    var signupForm = document.getElementById('formContainer');
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => {
        signupForm.querySelector('#errorMessage').innerHTML = e.message;
    });
    fname = document.getElementById('fname');
    lname = document.getElementById('lname');
    rePassword = document.getElementById('rePassword');
    fname.value = '';
    lname.value = '';
    email.value = '';
    password.value = '';
    rePassword.value = '';
    document.getElementById('errorMessage').innerHTML = '';
}
function signIn() {
    var emailL = document.getElementById("emailLogin");
    var passwordL = document.getElementById("passwordLogin");
    const promise = auth.signInWithEmailAndPassword(emailL.value, passwordL.value).then(()=> {
        window.open('a.html','self');
    });
    promise.catch(e => {
        document.getElementById('sorryMessage').innerHTML = e.message;
        emailL.classList.add("errorsign");
        emailL.classList.remove("noerrorsign");
        passwordL.classList.add("errorsign");
        passwordL.classList.remove("noerrorsign");
    });
        if(emailL.value != ''){
            emailL.classList.add("noerrorsign");
            emailL.classList.remove("errorsign");

        }else{
            emailL.classList.add("errorsign");
            emailL.classList.remove("noerrorsign");

        }
        if(passwordL.value != ''){
            passwordL.classList.add("noerrorsign");
            passwordL.classList.remove("errorsign");
        }else{
            passwordL.classList.add("errorsign");
            passwordL.classList.remove("noerrorsign");
        }
}
function signOut() {
    auth.signOut();
    alert("Signed Out");
}
auth.onAuthStateChanged(function (user) {
    if (user) {
        var email = user.email;
        alert("You use " + email);
        window.open('a.html');
    } else {
        alert("Please sign in");
    }
});