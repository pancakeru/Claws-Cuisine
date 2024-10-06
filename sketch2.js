let kitchenBg;
let highlightLeft;
let highlightRight;
let cook1;
let cook2;
let meat;
let cookedMeat;
let currentMeat;

let meatToUse = 1;
let cooking;
let selling;
let cooked;

let totalMoney;
let TotalMeat;

let currentBg;
let kaching;
let canSell;

let initialAmount;

function preload() {
    kitchenBg = loadImage("./images/kitchenbg.png");
    highlightLeft = loadImage("./images/kitchenHighlight.PNG");
    highlightRight = loadImage("./images/kitchenHighlight2.PNG");
    cook1 = loadImage("./images/cook1.png");
    cook2 = loadImage("./images/cook2.png");
    meat = loadImage("./images/meat sprite.png");
    cookedMeat = loadImage("./images/cooked meat.png");
    kaching = loadSound("./audio/kaching.mp3");
}

function setup() {
    createCanvas(300, 600);
    background(128, 224, 237);
    meatToUse = 1;
    currentMeat = meat;
    currentBg = kitchenBg;

    if (localStorage.getItem("money") === null) {
        totalMoney = 0;
    } else {
        totalMoney = parseFloat(localStorage.getItem("money"));
    }

    if (localStorage.getItem("meat collected") === null) {
        initialAmount = 0;
    } else {
       initialAmount = parseInt(localStorage.getItem("meat collected"));
    }

    TotalMeat = initialAmount;
}

function draw() {
    if (localStorage.getItem("meatAmount") === null) {
        meatToUse = 0;
    } else {
    meatToUse = parseInt(localStorage.getItem("meatAmount"));
    }
   // console.log(meatToUse);

   if (localStorage.getItem("meat collected") === null) {
    TotalMeat = 0;
    } else {
        TotalMeat = parseInt(localStorage.getItem("meat collected"));
    }

   if (TotalMeat - meatToUse >= 0) {
    canSell = true;
   } else {
    canSell = false;
   }

    image(currentBg, 0, 0, 350, 600);
    fill(0);
    textSize(35);

    if (mouseY > 350) {
        if (mouseX < 150) {
            currentBg = highlightLeft;
            text("Cook", 75, 580);
        } else {
            currentBg = highlightRight;
            text("Sell", 220, 580);
        }

    } else {
        currentBg = kitchenBg;
    }


    noStroke();
    fill(224, 111, 101, 200);
    rect(12, 12, 270, 100);
    fill(145, 123, 224, 200);
    rect(12, 112, 270, 100);

    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(30);
    text("Marbled Meat:", 150, 45);
    textSize(50);
    if (localStorage.getItem("meat collected") === null) {
        text("0", 150, 100);
    } else {
        text(localStorage.getItem("meat collected"), 150, 100);
    }


    textSize(30);
    text("Money:", 150, 140);
    textSize(50);
    if (localStorage.getItem("money") === null) {
        text("$0", 150, 195);
    } else {
        text("$" + localStorage.getItem("money"), 150, 195);
    }

    if (localStorage.getItem("meat collected") !== null) {
        image(currentMeat, 65, 230, 773 /3.5, 400/3.5);
    }

    if(meatToUse > 1) {
        text("x" + meatToUse, 150, 300);
    }
}


function mousePressed() {
    if (mouseY > 350 && meatToUse != 0 && canSell) {
        console.log("interacting");
        if (mouseX < 150) {
            cooked = true;
            currentMeat = cookedMeat;
        } else {
            if (cooked) {
                totalMoney += 5* meatToUse;
                localStorage.setItem("money", totalMoney);
                cooked = false;
            } else {
                totalMoney += 2* meatToUse;
                localStorage.setItem("money", totalMoney);
            }
            TotalMeat -= meatToUse;
            localStorage.setItem("meat collected",TotalMeat);
            currentMeat = meat;
            kaching.play();
        }
    }
}
