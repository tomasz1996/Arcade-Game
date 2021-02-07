var users = [];

if (localStorage.getItem("users") === null) {
    console.log("users is empty");
    localStorage.setItem("users", users);
  }

users = JSON.parse(localStorage.getItem('users'));


document.getElementById("loginButton").addEventListener("click",checkLogin);

function checkLogin(e){

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username === "admin" && password === "admin1!"){
        // document.getElementById('loginButton').classList.remove('shake');
        let currentUser = {
            userName: "admin",
            userPassword: "admin1!",
        }

        localStorage.setItem("loggedUser", JSON.stringify(currentUser));

        window.location.href = "Admin.html"; 
    } 

    for(let i = 0; i < users.length; i++){
    
        if(users[i].userName === username && users[i].userPassword === password)
        {
            let currentUser = {
                userId: users[i].userId,
                userName: users[i].userName,
                userEmail: users[i].userEmail,
                userPassword: users[i].userPassword,
                userScore: users[i].userScore, 
            }
    
            localStorage.setItem("loggedUser", JSON.stringify(currentUser));
            window.location.href = "user.html";
           
        }else if(users[i].userName !== username || users[i].userPassword !== password)
        {
            console.log("Appears when not matching")
            e.preventDefault();
            document.getElementById('loginButton').classList.add('shake');
            setTimeout(()=>{document.getElementById('loginButton').classList.remove('shake')},500)
        }
    
    }
}
    

