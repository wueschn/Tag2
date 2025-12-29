let playerX, playerY;
let targetX, targetY;
let score = 0;
let playerSize = 30;
let targetSize = 20;

function setup() {
    createCanvas(600, 400);
    // Startposition des Spielers (Mitte)
    playerX = width / 2;
    playerY = height / 2;
    
    // Erste Zielposition
    spawnTarget();
    
    textAlign(LEFT, TOP);
    textSize(20);
}

function draw() {
    background(50); // Dunkelgrauer Hintergrund
    
    // Spielerbewegung
    if (keyIsDown(LEFT_ARROW)) {
        playerX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        playerX += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        playerY -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        playerY += 5;
    }

    // Spieler im Canvas halten
    playerX = constrain(playerX, 0, width - playerSize);
    playerY = constrain(playerY, 0, height - playerSize);

    // Ziel zeichnen
    fill(0, 255, 100); // Grün
    noStroke();
    ellipseMode(CORNER); // Damit Kollision einfacher zu berechnen ist (ähnlich wie rect)
    ellipse(targetX, targetY, targetSize, targetSize);

    // Spieler zeichnen
    fill(255, 50, 50); // Rot
    rect(playerX, playerY, playerSize, playerSize);

    // Kollisionserkennung (einfache Rechteck-Kollision für den Kreis-Boundingbox)
    if (playerX < targetX + targetSize &&
        playerX + playerSize > targetX &&
        playerY < targetY + targetSize &&
        playerY + playerSize > targetY) {
        
        score++;
        spawnTarget();
    }

    // Score anzeigen
    fill(255);
    text("Punkte: " + score, 10, 10);
}

function spawnTarget() {
    targetX = random(0, width - targetSize);
    targetY = random(0, height - targetSize);
}
