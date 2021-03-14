let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
let users = JSON.parse(localStorage.getItem('users'));
let loggedUserId = loggedUser.userId;

let startButton = document.getElementById("startButton");
let interface = document.getElementById("interface");
let scoreOnTop = document.getElementById("scoreOnTop");
let scoreValue = document.getElementById("scoreValue");
let logOutButton = document.getElementById("logOutButton");
let top10Button = document.getElementById("top10Button");
let playerName = document.getElementById("spanName");

playerName.innerHTML = loggedUser.userName;
scoreOnTop.innerHTML = loggedUser.userScore;

//Fix shooting sound outside interface at start
interface.style.display = "block";

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

//Create CANVAS 
let canvas = document.getElementById("mycanvas");
let c = canvas.getContext('2d');

c.canvas.width = 900;
c.canvas.height = 650;
//Using @media changes bullets prajectory
if(window.innerHeight < 910) c.canvas.height = 550;

let bullets = [];
let enemies = [];
let stars = [];
let maxStars = 15;
let maxEnemies = 20;
let score = 0;

let playerImage = new Image();
playerImage.src = "images/player.png";

//Create Player Object
class Player{
    constructor(playerX, playerY, radius){
        this.x = playerX;
        this.y = playerY;
        this.radius = radius;
        // this.color = color;
    }

    draw(){
        //adjust image positions to actual objects
        // c.beginPath()
        // c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.drawImage(playerImage, this.x - this.radius-10, this.y - this.radius-15, this.radius*3,this.radius*3)
        // c.fillStyle = this.color;
        // c.fill();
    }
    
}

let enemyImage = new Image();
enemyImage.src = "images/enemy_cropped.png";
class Enemy{
    constructor(x, y, radius, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity
    }

    draw(){
        // c.beginPath()
        // c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        
        c.drawImage(enemyImage, this.x - this.radius-10, this.y - this.radius - 10, this.radius*3,this.radius*3)
        // c.fillStyle = this.color;
        // c.fill();
    }

    update(){
        this.draw();
        // I want enemy to move only downwards
        // this.x = this.x + this.velocity.x + this.radius/15;
        this.y = this.y + this.velocity.y;
    }
}

class Star{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity
    }

    draw(){
        c.globalCompositeOperation='destination-over'
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.shadowColor= "white"
        c.shadowBlur=12
        c.fill();
        c.fill();
        c.shadowBlur=0
    }

    update(){
        this.draw();
        this.y = this.y + this.radius/2;
    }
}

class Bullet{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update(){
            this.draw();
            this.x = this.x +  this.velocity.x *5;
            this.y = this.y +  this.velocity.y *5;
    }
}

//Create player at start
let playerX = canvas.width / 2 ;
let playerY = canvas.height / 1.15;
let player = new Player(playerX, playerY, 20, null);

function resetGame(){
     bullets = [];
     enemies = [];
     stars = [];
     score = 0;  
    player = new Player(playerX, playerY, 20, null);
    document.getElementById("scoreValue").innerHTML = score;
}

function createEnemy(){
    if(enemies.length < maxEnemies){
        //Create random radius and X position
        let randomRadius = Math.floor((Math.random()*30-10)+20)
        let randomXPosition = Math.floor((Math.random()*(canvas.width-40)+40))

        let velocity = {
            x: 0,
            y: Math.floor(Math.random()*(6)+2)
        }
        enemies.push(new Enemy(randomXPosition, -randomRadius, randomRadius, velocity));
        console.log("Enemies: "+ enemies.length);
    }
    
}

function createStar(){
    if(stars.length < maxStars){
        //Create random radius(1-6) and X position(15-790)
        let randomRadius = Math.floor((Math.random()*5-1)+2)
        let randomXPosition = Math.floor((Math.random()*(canvas.width-20)+10))
        let velocity = 1;
        stars.push(new Star(randomXPosition, -randomRadius, randomRadius, "white", velocity))
    }
}

//Create flags to indicate which keys are pressed
let keys = {}
window.addEventListener("keydown", (e)=>{ 
     keys[e.code] = true;
  });  
    
window.addEventListener("keyup", (e)=>{ 
 keys[e.code] = false;
}); 
     

let currentFrame
function animate(){
    currentFrame = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();

    //Controll speed of the player
    if(keys["ArrowUp"]){
        if(player.y > (0 + player.radius))
             player.y -= 3; 
     }
     if(keys["ArrowDown"]){
         if(player.y < (canvas.height - player.radius))
              player.y += 3; 
      }
      if(keys["ArrowLeft"]){
         if(player.x > (0 + player.radius))
              player.x -= 3; 
      }
      if(keys["ArrowRight"]){
         if(player.x < (canvas.width - player.radius))
              player.x += 3; 
      }   


    bullets.forEach((bullet,bulletIndex)=>{
        bullet.update()
        // Remove bullets off the screen
        if ((bullet.y > canvas.height + bullet.radius) ||
            (bullet.x > canvas.width + bullet.radius) ||
            (bullet.y < 0 - bullet.radius) ||
            (bullet.x < 0 - bullet.radius) ){
            //Remove glitching effect by using setTimeout
            setTimeout(()=>{
                bullets.splice(bulletIndex, 1)
                console.log("Bullet out");
            },0) 
        }
    });
    

    enemies.forEach((enemy,enemyIndex)=>{
        enemy.update()
        bullets.forEach((bullet,bulletIndex)=>{
            let distanceBullet = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y)
            //Collision HIT
            if(distanceBullet < bullet.radius + enemy.radius){
                //Add explosion sounds
                let explosionSound = new Audio();
                explosionSound.src = "sounds/explosion"+Math.floor((Math.random()*5-1)+1)+".wav";
                explosionSound.play();

                score += 10;
                document.getElementById("scoreValue").innerHTML = score;
                //SetTimeout used to prevent glitching 
                setTimeout(()=>{
                enemies.splice(enemyIndex,1);
                bullets.splice(bulletIndex,1);   
                },0)
            }
        })
        //remove enemies from offscreen
            if (enemy.y > canvas.height + enemy.radius + 1200){
                //Remove glitching effect by using setTimeout
                setTimeout(()=>{
                    enemies.splice(enemyIndex, 1)

                },0) 
            }
        let distanceEnemy = Math.hypot(enemy.x - player.x, enemy.y - player.y)

        //GAME OVER
        if(distanceEnemy < player.radius + enemy.radius){
            //Stop the game and show result
            let gameoverSound = new Audio();
            gameoverSound.src = "sounds/gameover.wav"
            gameoverSound.play();
            cancelAnimationFrame(currentFrame)
            scoreOnInterface.innerHTML = score;
            scoreValue.innerHTML = score;
            interface.style.display = "block"

            //Save highscore in memory if we have a record and display on top
            let objectIndex = users.findIndex(obj => {return obj.userId == loggedUserId})
            if(users[objectIndex].userScore < score){
                users[objectIndex].userScore = score;
                loggedUser.userScore = score;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
                scoreOnTop.innerHTML = users[objectIndex].userScore;
            }
        }
    });
 
    stars.forEach((star,starIndex)=>{
        star.update();
        //Remove stars from offscreen
        if (star.y > canvas.height){
            //Remove glitching effect by using setTimeout
            setTimeout(()=>{
                stars.splice(starIndex,1)
             },0)
        } 
    });

}

//Set canvas coordinates related to canvas , not to window so left corner is (0,0)
var canvasPosition = canvas.getBoundingClientRect();

//Position question mark 
const question = document.getElementById("question")
const controls = document.getElementById("controls")
question.style.position = "absolute";
question.style.top = canvasPosition.top + 5 + "px";
question.style.left = canvasPosition.left + 5 + "px";
controls.style.top = canvasPosition.top + 10 + "px";
controls.style.left = canvasPosition.left + 50 + "px";

question.addEventListener("mouseover",()=>{
    controls.style.zIndex = 1;
})
question.addEventListener("mouseout",()=>{
    controls.style.zIndex = -1;
})

canvas.addEventListener("click",(e)=>{

    // let randomSound = Math.floor((Math.random()*3-1)+1);
    let laserSound = new Audio();
    laserSound.src = "sounds/laser"+Math.floor((Math.random()*3-1)+1)+".wav";

    if(interface.style.display != "block")
    laserSound.play();

    let x = e.clientX - canvasPosition.left;
    let y = e.clientY - canvasPosition.top;

    
    //Calculate the angle and velocity of the bullet
    let atan2 = Math.atan2(y - player.y ,x - player.x)
    let velocity = {
      x: Math.cos(atan2),
      y: Math.sin(atan2)
    }
    bullets.push(new Bullet(player.x, player.y, 5, "red", velocity));

});

//Restart the game 
startButton.addEventListener("click",()=>{
    interface.style.display = "none"
    resetGame();
    animate();
    setInterval(createEnemy,250)
    setInterval(createStar,250)
    
})

//refresh the page after resize to align question img
window.onresize = ()=>{
    window.location.href = "user.html";
}
// Sound effects obtained from https://www.zapsplat.com



// class Stars {
//     constructor(){
//       this.stars = [];
//     }
    
//     add() {
//         const radius = Math.floor( Math.random()*5 );
//       const x = Math.floor( Math.random()*780+15 );
//       const star = new Star(x, radius, "white",1);
//       this.stars.push( star );
//     }
    
//     update() {
//       console.log( this.stars.length );
//       this.stars = this.stars.filter( star => star.y < 10 );
//       for( let star of this.stars ) {
//         star.update();
//       }
//     }
//   }
  
//   class Star {
//       constructor(x, radius, color, velocity){
//           this.x = x;
//           this.y = -radius;
//           this.radius = radius;
//           this.color = color;
//           this.velocity = velocity
//       }
     
//       update(){
//           this.y += Math.max(1, this.radius/2);
//       }
//   }
  
//   let stars = new Stars();
//   setInterval(()=>{
//     stars.add();
//     stars.update();
//   },3000);
  
//   // call the render function from requestAnimationFrame, passing in the stars data. This would avoid mixing different kinds of logic up
//   function render( stars ) {
//       // console.log('rendering stars to screen');
//     // do something with stars to show them
//   }


