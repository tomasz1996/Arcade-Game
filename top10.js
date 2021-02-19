let users = "[]";
let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
let backButton = document.getElementById("backButton")
let logOutButton = document.getElementById("logOutButton")
users = JSON.parse(localStorage.getItem('users'));
var topTable = document.getElementById("topTable");


//LOG OUT
logOutButton.addEventListener("click", ()=>{
    loggedUser = "[]"
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    window.location.href = "login.html";
})


backButton.addEventListener("click", ()=>{
    if(loggedUser.userName == "admin"){
        window.location.href = "admin.html";
    }else{
        window.location.href = "user.html";
    }
})

//Sort users by the score
let sortedUsers = users.sort((a,b)=>{
    return b.userScore - a.userScore;
})
 
//Fill rows with players
for(let j = 0; j < 10; j++){
    let row = topTable.rows[j+1]
    row.cells[1].innerHTML = sortedUsers[j].userName;
    row.cells[2].innerHTML = sortedUsers[j].userScore;
}
