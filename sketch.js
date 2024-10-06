//Sprites
let mochiRight;
let ground;
let cloud;
let mountain;
let meat;
let poop;
let mochiUp;
let mochiDown;

//Audio
let HERECOMESTHESUN;
let jumpSound;
let meow;
let collectSound;
let buttonSound;
let injurySound;

//player vars
let playerX;
let playerY;
let playerSpeed;
let jump;
let jumpForce;
let currentSprite;
let isFlipped = false;
let playerWidth = 165;
let playerHeight = 160;
let groundBound = 390;
let jumpTimer = 10;

//game control
let gameStart = false;
const gameStates = {
    START: "start",
    PLAYING: "playing",
    GG: "gg"
}
let currentState = gameStates.START;
let totalMeat = 0;
let endTimer;
let gameoverText = false;
let startscreenText = true;
let difficulty = 0;
let changeTimer = 0;

//ground vars
let groundX;
let groundX2;
let groundSpeed;

//cloud vars
let clouds = [];
let cloudNum = 6;

//mountain vars
let mountainX;
let mountainX2;
let mountainSpeed;
let mountainX3;

//meat vars
let meatX;
let meatSpeed;
let meatY;

//platform vars
let platforms = [];
let platformWidth = 400;
let platformHeight = 55;
let anothaOne = false;
let currentPlatform = null;
let departed = true;

//let landOnPlatform = false;
let fallDown = false;

//poop vars
let poops = [];

//obstacle prefab spawner
let obstacleManager;

//player score
let score = 0;

//upgrade vars
let ug1;
let ug2;
let ug3;
let ug4;

let doubleJump = false;
let lives = 0;
let initialHP = 0;
let heart;
let add1;
let add2;
let add3;

function preload() {
    mochiRight = loadImage("./images/mochisprite.png");
    mochiUp = loadImage("./images/mochiUp.png");
    mochiDown = loadImage("./images/mochiDown.png");
    ground = loadImage("./images/grass terrain.png");
    cloud = loadImage("./images/cloud sprite.png");
    mountain = loadImage("./images/mountain terrain.png");
    meat = loadImage("./images/meat sprite.png");
    poop = loadImage("./images/dirt terrain.png");
    HERECOMESTHESUN = loadSound("./audio/Here Comes The Sun (Instrumental) [ ezmp3.cc ].mp3");
    jumpSound = loadSound("./audio/jump.wav");
    meow = loadSound("./audio/meow.wav");
    collectSound = loadSound("./audio/coin.wav");
    buttonSound = loadSound("./audio/button.wav");
    heart = loadImage("./images/heart.png");
    injurySound = loadSound("./audio/punch.mp3");

}

function setup() {
    createCanvas(900, 600);
    background(128, 224, 237);
    playerSpeed = 6;
    playerX = 0;
    playerY = 390;
    jump = false;
    jumpForce = 20;
    currentSprite = mochiRight;
    groundX = 0;
    groundX2 = 1500;
    groundSpeed = 3;
    meatSpeed = 3;
    lives = initialHP;

    for (let i = 0; i < cloudNum; i++) {
        let cloud = new Cloud();
        clouds.push(cloud);
      }

      obstacleManager = new ObstacleManager();
    
    mountainX = 0;
    mountainX2 = 860;
    mountainX3 = 1500;
    mountainSpeed = 1;
    meatX = 1000;
    meatY = 415;

    let savedScore = localStorage.getItem("meat collected");
   // savedScore = 0;
    if (savedScore !== null) {
        totalMeat = int(savedScore);
    }

    if (localStorage.getItem("double jump") === null) {
        ug4 = false;
    } else {
        ug4 = true;
    }

    if (localStorage.getItem("ug1") === null) {
        ug1 = false;
        add1 = false;
    } else {
        ug1 = true;
    }

    if (localStorage.getItem("ug2") === null) {
        ug2 = false;
        add2 = false;
    } else {
        ug2 = true; 
    }

    if (localStorage.getItem("ug3") === null) {
        ug3 = false;
        add3 = false;
    } else {
        ug3 = true;
    }

    if (localStorage.getItem("double jump") === null) {
        ug4 = false;
    } else {
        ug4 = true;
    }

    if (ug1 && !add1) {
        initialHP += 1;
        add1 = true;
    }

    if (ug2 && !add2) {
        initialHP += 1;
        add2 = true;
    }

    if (ug3 && !add3) {
        initialHP += 1;
        add3 = true;
    }
}

function mousePressed() {
    if (!HERECOMESTHESUN.isPlaying()) {
        HERECOMESTHESUN.loop();
      }
}

function draw() {
    background(128, 224, 237);

    if (localStorage.getItem("ug1") === null) {
        ug1 = false;
        add1 = false;
    } else {
        ug1 = true;
    }

    if (localStorage.getItem("ug2") === null) {
        ug2 = false;
        add2 = false;
    } else {
        ug2 = true; 
    }

    if (localStorage.getItem("ug3") === null) {
        ug3 = false;
        add3 = false;
    } else {
        ug3 = true;
    }

    if (localStorage.getItem("double jump") === null) {
        ug4 = false;
    } else {
        ug4 = true;
    }

    if (ug1 && !add1) {
        initialHP += 1;
        add1 = true;
    }

    if (ug2 && !add2) {
        initialHP += 1;
        add2 = true;
    }

    if (ug3 && !add3) {
        initialHP += 1;
        add3 = true;
    }

    if (localStorage.getItem("double jump") === null) {
        ug4 = false;
    } else {
        ug4 = true;
    }

    if (ug1 && !add1) {
        initialHP += 1;
        add1 = true;
    }

    if (ug2 && !add2) {
        initialHP += 1;
        add2 = true;
    }

    if (ug3 && !add3) {
        initialHP += 1;
        add3 = true;
    }

    switch (currentState) {
        case gameStates.START:
            endTimer = 100;
            meatX = random(1000, 1500);
            meatY = random(50, 415);
            score = 0;
            gameoverText = false;
            currentSprite = mochiRight;
            isFlipped = false;
            groundBound = 390;
            startscreenText = true;
            lives = initialHP;

            let savedScore = localStorage.getItem("meat collected");
            if (savedScore !== null) {
                totalMeat = int(savedScore);
            }

            for (let plat of platforms) {
                plat.reset();
                plat.landOnPlatform = false;
            }

            platforms = platforms.filter(plat => !plat.isReset);

            for (let poo of poops) {
                poo.reset();
            }

            poops = poops.filter(poo => !poo.isReset);

            obstacleManager.spawnRate = 500;

            playerX = 0;
            playerY = 390;

            if (keyIsDown(32)) {
                if (!HERECOMESTHESUN.isPlaying()) {
                    HERECOMESTHESUN.loop();
                  }

                  startscreenText = false;

                  currentState = gameStates.PLAYING;
            }
        break;

        case gameStates.PLAYING:
            //only once game is started does input register
                obstacleManager.update();
        
            //player movement
            //left A
            if (keyIsDown(65)) {
                playerX -= playerSpeed;
                isFlipped = true; 
            }
            //right D
            if (keyIsDown(68)) {
                playerX += playerSpeed;
                isFlipped = false; 
            }
        
            //player boundaries
            if (playerX <= -20) {
                playerX = -20;
            }
        
            if (playerX >= 750) {
                playerX = 750;
            }
        
            //jumping
            if (keyIsDown(32) && !jump && jumpForce == 20) {
                jump = true;
                if (!jumpSound.isPlaying()) {
                    jumpSound.play();
                }
            }
        
            if (jump && !fallDown) {
                //add remove force
                playerY -= jumpForce;
                jumpForce--;
                jumpTimer--;

                if (ug4) {
                    if (keyIsDown(32) && !doubleJump && jumpTimer <= 0) {
                        jumpForce = 20;
                        doubleJump = true;
                        jumpSound.play();
                    }
                }
        
                //change sprite
                if (jumpForce >= 0) {
                    currentSprite = mochiDown;
                } else {
                    currentSprite = mochiUp;
                }
        
                //reset jump
            } else {
                    jumpForce = 20;
                    currentSprite = mochiRight;     
                    jumpTimer = 10; 
            }
        
            if (playerY >= groundBound) {
                jump = false;
                playerY = groundBound;
                doubleJump = false;
            } else {
                if (!jump) {
                fallDown = true;
                }
            }
        
            if (fallDown) {
                playerY += 10;
                currentSprite = mochiUp;
                
                if (playerY >= groundBound) {
                    playerY = groundBound;
                    fallDown = false;
                   // departed = true;
                }
            }
        
            //ground parallax
            groundX -= groundSpeed;
            groundX2 -= groundSpeed;
        
            if (groundX <= -1500) {
                groundX = 1500;
            }
        
            if (groundX2 <= -1500) {
                groundX2 = 1500;
            }
        
            //mountain parallax
            mountainX -= mountainSpeed;
            mountainX2 -= mountainSpeed ;
            mountainX3 -= mountainSpeed *1.2;
            meatX -= meatSpeed;
        
            if (mountainX <= -1600) {
                mountainX = 800;
            }
        
            if (mountainX2 <= -1600) {
                mountainX2 = 1000;
            }
        
            if (mountainX3 <= -1600) {
                mountainX3 = 1400;
            }
        
            if (meatX <= -150) {
                meatX = random(1000, 1500);
                meatY = random(50, 415);
            }
        
            let d = dist(playerX, playerY, meatX, meatY);
        
            if (d <= 100) {
                score += 1;
                meatX = random(1000, 1500);
                meatY = random(50, 415);
                collectSound.play();
            }
        break;

        case gameStates.GG:
            endTimer--;
            textSize(120);
            gameoverText = true;

            if (endTimer <= 0) {
                totalMeat += score;
                localStorage.setItem("meat collected", totalMeat);
                currentState = gameStates.START;
                console.log(localStorage.getItem("meat collected"));
            }
        break;
    }

    image(mountain, mountainX, 120, 1800, 400);
    image(mountain, mountainX2, 120, 1800, 400);
    image(mountain, mountainX3, 120, 1800, 400);

    for (let cloud of clouds) {
        cloud.move();
        cloud.display();
      }

      for (let poo of poops) {
        poo.move();
        poo.display();
        poo.collidePlayer();
      }

      poops = poops.filter(poo => !poo.isOutOfBounds());

    image(meat, meatX, meatY, 165, 90);

    for (let plat of platforms) {
        plat.move();
        plat.display();

        plat.onPlatform();
        
        platforms = platforms.filter(plat => !plat.isOutOfBounds());

        if (plat.checkCollision(playerX, playerY, playerWidth, playerHeight, jumpForce)) {
            // Player has landed on this platform
            plat.landOnPlatform = true;
        } 

        if (plat.landOnPlatform) {
            groundBound = 200;
           // departed = false;
        } else {
            groundBound = 390;
        }
    }

    //draw the player sprite
    push(); 
    
    if (isFlipped) {
        // moving left
        translate(playerX + currentSprite.width, playerY); 
        scale(-1, 1);  
        image(currentSprite, 0, 0);  
    } else {
        //moving right
        image(currentSprite, playerX, playerY);
    }

    pop(); 
    
    image(ground, groundX, 500);
    image(ground, groundX2, 500);

    textSize(60);
    fill(0, 0, 0);
    textAlign(LEFT);
    text(score, 25, 70);

    textAlign(CENTER);
    textSize(120);
    if (gameoverText) {
        text("Game Over", 450, 300);
    }

    if (startscreenText) {
        changeTimer--;
        noStroke();
        fill(255, 255, 255, 180);
        rect(150, 50, 600, 400);
        fill(0, 0, 0);
        textSize(40);
        textAlign(CENTER);
        text("Select Mode", 450, 100);
        textSize(30);
        text("'A' and 'D' keys to switch", 450, 380);
        text("'Space' to start", 450, 420);

        if (keyIsDown(65) && difficulty > 0 && changeTimer <= 0) {
            difficulty -= 1;
            changeTimer = 10;
            buttonSound.play();
        }

        if (keyIsDown(68) && difficulty < 2 && changeTimer <= 0) {
            difficulty += 1;
            changeTimer = 10;
            buttonSound.play();
        }

        textSize(120);
        switch (difficulty) {
            case 0:
                fill(90, 181, 65);
                text("Relaxed", 450, 270);

                groundSpeed = 3;
                meatSpeed = 3;
            break;

            case 1:
                fill(222, 179, 49);
                text("Excited", 450, 270);

                groundSpeed = 4;
                meatSpeed = 4;
            break;

            case 2:
                fill(222, 49, 92);
                text("Hyper", 450, 270);

                groundSpeed = 5;
                meatSpeed = 5;
            break;
        }

    }

    switch (lives) {
        case 1:
            image(heart, 800, 10, 80, 80);
        break;

        case 2:
            image(heart, 800, 10, 80, 80);
            image(heart, 710, 10, 80, 80);
        break;

        case 3:
            image(heart, 800, 10, 80, 80);
            image(heart, 710, 10, 80, 80);
            image(heart, 620, 10, 80, 80);
        break;
    }
    
}


//cloud class
class Cloud {
    //assigning some properties
    constructor() {
        this.x = random(width);
        this.y = random(50, 300);  
        this.size = random(100, 250);  
        this.speed = random(1, 4); 
      }
    
      //function for moving across screen
      move() {
        this.x -= this.speed;
 
        if (this.x < -this.size) {
          this.reset();
        }
      }
    
      //function for re-randomizing once reset
      reset() {
        this.x = width;
        this.y = random(1, 120);
        this.size = random(150, 350);
        this.speed = random(0.3, 2);
      }
    
      //function for displaying the cloud
      display() {
        image(cloud, this.x, this.y, this.size, this.size * (cloud.height / cloud.width));
      }
}


//platform class
class Platform {
    constructor(x, y) {
        this.originalX = width + 200;
        this.x = x;
        this.y = y;
        this.speed = groundSpeed;
        this.width = platformWidth;
        this.height = platformHeight;
        this.landOnPlatform = false;
        this.isReset = false;
    }

    move() {
        if (currentState == gameStates.PLAYING) {
            this.x -= this.speed;
        }
    }

    display() {
        image(ground, this.x, this.y, this.width, this.height);
    }

    reset() {
     this.isReset = true;
    }

    checkCollision(playerX, playerY, playerWidth, playerHeight, jumpForce) {
        let playerBottom = playerY + playerHeight-20;
        let platformTop = this.y;
        let playerRight = playerX + playerWidth;
        let platformRight = this.x + this.width;
    
        // Collision detection logic
        let tolerance = 10; 
        let isLanded = playerBottom >= platformTop && playerBottom <= platformTop + tolerance;
        let isInBounds = playerX < platformRight && playerRight > this.x;
        let isFalling = jumpForce < 0;
    
        return isLanded && isInBounds;
    }


    onPlatform(){
        if (playerX + playerWidth < this.x || playerX > this.x + this.width
         || playerY > 200) {
                this.landOnPlatform = false;
                groundBound = 390;
            }

}

    isOutOfBounds() {
        if (this.x < -400) {
            this.landOnPlatform = false;
            return true;
        } else {
            return false;
        }
    }

}

class Poo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = meatSpeed;
        this.width = 165;
        this.height = 90;
        this.isReset = false;
        this.oops = false;
    }

    move() {
        if (currentState == gameStates.PLAYING) {
            this.x -= this.speed;
        }
    }

    display() {
        image(poop, this.x, this.y, this.width, this.height);
    }

    isOutOfBounds() {
        // Return true if the obstacle is out of bounds
        if (this.x < -150) {
            return true;
        } else {
            return false;
        }
    }

    collidePlayer() {
        let d2player = dist(this.x, this.y, playerX, playerY);

        if (d2player <= 100 && currentState == gameStates.PLAYING) {
            if (!this.oops) {
                lives -= 1;
                this.oops = true;

                if (lives >= 0) {
                injurySound.play();
                }
            }

            if (lives < 0) {
                currentState = gameStates.GG;
                meow.play();
            }
        }
    }

    reset() {
        this.isReset = true;
    }
}

class ObstacleManager {
    constructor() {
        this.listLength = 6;
        this.index = 1;
        this.spawnRate = 500; 
        this.timeSinceLastSpawn = 0; 
        this.spawnRateDecreaseFactor = 0.95;
        this.created = false;
    }

    newIndex() {
       this.index = Math.floor(random(0, this.listLength));
      // this.index = 1;
    }
    
    updateSpawnRate() {
        this.spawnRate *= this.spawnRateDecreaseFactor; 

        switch (difficulty) {
            case 0:
                if (this.spawnRate < 300) { 
                    this.spawnRate = 300;
                }
            break;

            case 1:
                if (this.spawnRate < 100) { 
                    this.spawnRate = 100;
                }
            break;

            case 2:
                if (this.spawnRate < 10) { 
                    this.spawnRate = 10;
                }
            break;
        }
    }

    obstacle0() {
        poops.push(new Poo(width, 440));
    }

    obstacle1() {
        poops.push(new Poo(width, 440));
        poops.push(new Poo(width + 400, 260));
        platforms.push(new Platform(width + 200, 320));
    }

    obstacle2() {
        poops.push(new Poo(width, 440));
        poops.push(new Poo(width + 80, 440));
        poops.push(new Poo(width + 370, 440));
    }

    obstacle3() {
        poops.push(new Poo(width, 440));
        poops.push(new Poo(width + 680, 440));
        poops.push(new Poo(width + 370, 440));
    }

    obstacle4() {
        poops.push(new Poo(width, 440));
        poops.push(new Poo(width + 120, 440));
        poops.push(new Poo(width + 75, 400));
    }

    obstacle5() {
        platforms.push(new Platform(width + 400, 320));
        poops.push(new Poo(width + 500, 440));
        poops.push(new Poo(width + 850, 440));
    }


    spawnObstacle() {
        console.log(this.index);
        if (!this.created) {
        switch(this.index) {
            case 0:
                this.obstacle0();
            break;
                
            case 1:
                this.obstacle1();
            break;

            case 2:
                this.obstacle2();
            break;

            case 3:
                this.obstacle3();
            break;

            case 4:
                this.obstacle4();
            break;

            case 5:
                this.obstacle5();
            break;
        }
        this.created = true;
    }
    }

    update() {
        this.timeSinceLastSpawn += 1;  // Accumulate time

        // If enough time has passed, spawn a new obstacle
        if (this.timeSinceLastSpawn >= this.spawnRate) {
            this.spawnObstacle();  // Spawn the obstacle
            this.timeSinceLastSpawn = 0;  // Reset the timer
            this.updateSpawnRate();
            this.newIndex();  
            this.created = false;
        }
    }


}

