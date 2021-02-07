
//LOG OUT 
logOutButton.addEventListener("click", ()=>{
    let currentUser = []
    localStorage.setItem("loggedUser", JSON.stringify(currentUser));
    window.location.href = "login.html";
})
// Go to top10
top10Button.addEventListener("click", ()=>{
    window.location.href = "top10.html";
})

let users = [];
users = JSON.parse(localStorage.getItem('users'));

// let table = document.getElementById("userTable");
let tbody = document.querySelector("tbody");

for(let i = 0; i < users.length; i++){

    //instert user into table
    let row = tbody.insertRow(-1);
    let idCell = row.insertCell(0);
    let usernameCell = row.insertCell(1);
    let emailCell = row.insertCell(2);
    let passwordCell = row.insertCell(3);
    let scoreCell = row.insertCell(4);
    let optionsCell = row.insertCell(5);

    idCell.innerHTML = users[i].userId; 
    usernameCell.innerHTML = users[i].userName; 
    emailCell.innerHTML = users[i].userEmail; 
    passwordCell.innerHTML = users[i].userPassword;
    scoreCell.innerHTML = users[i].userScore;
    
    let resetButton = document.createElement("button");
    resetButton.setAttribute("id", JSON.stringify("reset"+users[i].userId));
    resetButton.innerHTML = "Reset Score";
    resetButton.addEventListener("click", resetScore);
    
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", JSON.stringify("remove"+users[i].userId));
    deleteButton.innerHTML = "Remove User";
    deleteButton.addEventListener("click", removeUser);


    optionsCell.appendChild(resetButton);
    optionsCell.appendChild(deleteButton);
    
    function resetScore(){
            //Take id from button Id (remove "reset" from its id)
            let userId = this.id.slice(6,-1);
            let objectIndex = users.findIndex(obj => {return obj.userId == userId})
            users[objectIndex].userScore = 0;
//            console.log(users[objectIndex]);
//            console.log(users[objectIndex].userScore = 0);
            localStorage.setItem("users", JSON.stringify(users));
            location.reload();
        } 
    
    function removeUser(){
        //Take id from button Id (remove "remove" from its id)
            let userId = this.id.slice(7,-1);
            let objectIndex = users.findIndex(obj => {return obj.userId == userId})
            users.splice(objectIndex,1);
            localStorage.setItem("users", JSON.stringify(users));
            location.reload();
        }
   
}

 