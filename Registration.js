
var specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var specialNumbers = /^(?=.*[0-9])/;
var emailCharacters = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Flags to verify users and activate Register button
var checkArray = [false, false, false, false];

// If key "users" in LS doesn't exists, create one 
var users = [];

if (localStorage.getItem("users") === null) {
    console.log("users is empty");
    localStorage.setItem("users", JSON.stringify(users));
  }

users = JSON.parse(localStorage.getItem('users'));
console.log("Users in LS on loaded REG: "+users);

// Displaying password info
var new_password = document.getElementById('new_password');

new_password.onfocus = function () {
    document.getElementById('popup_password').style.display = 'block';
}
new_password.onblur = function () {
    document.getElementById('popup_password').style.display = 'none';
}
new_password.onmouseover = function () {
    document.getElementById('popup_password').style.display = 'block';
}
new_password.onmouseout = function () {
    document.getElementById('popup_password').style.display = 'none';
}


function checkUsername() {
    
    activateButton();
    var username = document.getElementById('username').value;
    
//Check if username already exists
    if(users.some(user => user.userName == username)){
        document.getElementById('popup_username').style.display = 'block';
        document.getElementById('username').style.backgroundImage = "linear-gradient(to bottom, white ,white,  red )";
        return checkArray[0] = false;
    }else{
        document.getElementById('popup_username').style.display = 'none';
    }
    
    if (username.length == 0) {
        document.getElementById('username').style.backgroundImage = "linear-gradient(to bottom, white ,white,  white )";
        return checkArray[0] = false;
    }

    if (specialCharacters.test(username) || username.length < 5) {
        document.getElementById('username').style.backgroundImage = "linear-gradient(to bottom, white ,white,  red )";
        return checkArray[0] = false;
    }

    if (username.length >= 5) {
        document.getElementById('username').style.backgroundImage = "linear-gradient(to bottom, white ,white,  green )";
        return checkArray[0] = true;
    }
}


function checkEmail() {

    activateButton();
    let email = document.getElementById('email').value.toLowerCase();
    
    if(users.some(user => user.userEmail == email)){
        document.getElementById('popup_email').style.display = 'block';
        document.getElementById('email').style.backgroundImage = "linear-gradient(to bottom, white ,white, red )";
        return checkArray[1] = false;
    }else{
        document.getElementById('popup_email').style.display = 'none';
    }
    
    if (email.length == 0) {
        document.getElementById('email').style.backgroundImage = "linear-gradient(to bottom, white ,white, white )";
        return checkArray[1] = false;
    }

    if (email.match(emailCharacters)) {
        document.getElementById('email').style.backgroundImage = "linear-gradient(to bottom, white ,white, green )";
        return checkArray[1] = true;
    } else {
        document.getElementById('email').style.backgroundImage = "linear-gradient(to bottom, white ,white, red )";
        return checkArray[1] = false;
    }
}


function checkNewPassword() {

    activateButton();
    checkConfirmedPassword();
    let new_password = document.getElementById('new_password').value;

    if (new_password.length == 0) {
        document.getElementById('new_password').style.backgroundImage = "linear-gradient(to bottom, white ,white,  white )";
        return checkArray[2] = false;
    }
    if (/\s/.test(new_password)) {
        document.getElementById('new_password').style.backgroundImage = "linear-gradient(to bottom, white ,white,  red )";
        alert("Password can't contain spaces! It must contain at least one number and special character.");
        return checkArray[2] = false;
    }
    if (new_password.length < 5) {
        document.getElementById('new_password').style.backgroundImage = "linear-gradient(to bottom, white ,white,  red )";
        return checkArray[2] = false;
    }

    if (new_password.length >= 5 && (!specialNumbers.test(new_password) || !specialCharacters.test(new_password))) {
        document.getElementById('new_password').style.backgroundImage = "linear-gradient(to bottom, white ,white,  red )";
        return checkArray[2] = false;
    }

    if (new_password.length >= 5 && specialNumbers.test(new_password) && specialCharacters.test(new_password)) {
        document.getElementById('new_password').style.backgroundImage = "linear-gradient(to bottom, white ,white,  green )";
        return checkArray[2] = true;
    }
}


function checkConfirmedPassword() {

    activateButton();
    let confirm_password = document.getElementById('confirm_password').value;
    let new_password = document.getElementById('new_password').value;

    if (confirm_password.length == 0) {
        document.getElementById('confirm_password').style.backgroundImage = "linear-gradient(to bottom, white ,white,  white )";
        return checkArray[3] = false;
    }

    if (new_password === confirm_password && new_password.length >= 5 && specialCharacters.test(new_password) && specialNumbers.test(new_password)) {
        document.getElementById('confirm_password').style.backgroundImage = "linear-gradient(to bottom, white ,white,  green )";
        return checkArray[3] = true;
    } else {
        document.getElementById('confirm_password').style.backgroundImage = "linear-gradient(to bottom, white ,white,  red )";
        return checkArray[3] = false;
    }
}

// setTimeout used to let the checkArray get updated before checking to activate button
function activateButton() {
    setTimeout(function () {
        if (checkArray.every(Boolean)) {
            document.getElementById('register_button').disabled = false;
            document.getElementById('register_button').classList.remove("deactivated");
            document.getElementById('register_button').classList.add("activated");
            document.getElementById('register_button').addEventListener("click", createUser);
        } else {
            document.getElementById('register_button').disabled = true;
            document.getElementById('register_button').classList.remove("activated");
            document.getElementById('register_button').classList.add("deactivated");

        }
    }, 50);
}

function createUser() {
    
displayAnimation(); 
    
var userName = document.getElementById('username').value;
var userEmail = document.getElementById('email').value.toLowerCase();
var userPassword = document.getElementById('confirm_password').value;

    let user = {
        userId: Date.now(),
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
        userScore: 0, 
    }
    
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Users after registration in LS: "+users);
    
    //clear registration form
    document.forms[0].reset();
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) inputs[i].style.backgroundImage = "none";
    document.getElementById('register_button').disabled = true;
    document.getElementById('register_button').classList.remove("activated");
    checkArray = [false, false, false, false];
    
}

function displayAnimation(){
    
    //start animation and dark theme
    document.getElementById("greenMessage").classList.add("animateIn");
    document.getElementById("darkId").style.display = "block";
    
    //hide animation and reload to Login page
    document.getElementById("successToLogin").addEventListener("click",()=>{
     document.getElementById("greenMessage").classList.add("animateOut");
        setTimeout(()=>{
            window.location.href = "login.html"
        }, 500);
    })
    
}