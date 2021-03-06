var users = "[]";
//Create empty array if not existing
if (localStorage.getItem("users") === null) {
    console.log("users is empty");
    localStorage.setItem("users", users);
  }

users = JSON.parse(localStorage.getItem('users'));


document.getElementById("loginButton").addEventListener("click",checkLogin);

function checkLogin(e){
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //Login as an admin
    if(username === "admin" && password === "admin1!"){
        let currentUser = {
            userName: "admin",
            userPassword: "admin1!",
        }
        localStorage.setItem("loggedUser", JSON.stringify(currentUser));
        window.location.href = "Admin.html";
        // setTimeout(()=>{}, 1000);
    } 

    let logingFlag = false;

    for(let i = 0; i < users.length; i++){
        if(users[i].userName === username && users[i].userPassword === password) {
            let currentUser = {
                userId: users[i].userId,
                userName: users[i].userName,
                userEmail: users[i].userEmail,
                userPassword: users[i].userPassword,
                userScore: users[i].userScore, 
            }
            localStorage.setItem("loggedUser", JSON.stringify(currentUser));
            window.location.href = "user.html";
            logingFlag = true;
            
    }   //delay shaking when inputs are correct
        setTimeout(()=>{
            shake();
        },50)

        function shake(){
            console.log(logingFlag);
            console.log("Not matching")
            document.getElementById('loginButton').classList.add('shake');
            setTimeout(()=>{document.getElementById('loginButton').classList.remove('shake')},500) 
        }
    }
}
    

