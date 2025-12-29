let playerX, playerY;
let targetX, targetY;
let score = 0;
let playerSize = 30;
let targetSize = 20;

let stars = [];
let trail = [];


function setup() {
    createCanvas(600, 400);
    // Startposition des Spielers (Mitte)
    playerX = width / 2;
    playerY = height / 2;

    // Sterne generieren
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3),
            brightness: random(150, 255)
        });
    }

    // Erste Zielposition
    spawnTarget();

    textAlign(LEFT, TOP);
    textSize(20);
}

function draw() {
    background(15, 15, 25); // Deep space blue background

    // Sterne zeichnen
    noStroke();
    for (let star of stars) {
        fill(255, 255, 255, star.brightness);
        ellipse(star.x, star.y, star.size, star.size);

        // Funkeln effekt
        if (random(1) < 0.02) {
            star.brightness = random(150, 255);
        }
    }

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

    // Trail aktualisieren
    trail.push({ x: playerX, y: playerY });
    if (trail.length > 20) {
        trail.shift();
    }

    // Trail zeichnen
    noStroke();
    for (let i = 0; i < trail.length; i++) {
        let pos = trail[i];
        let alpha = map(i, 0, trail.length, 0, 200); // Transparenz basierend auf Alter
        fill(255, 50, 50, alpha);
        // Etwas kleiner als der Spieler für cooleren Effekt? Oder gleich groß?
        // Nehmen wir die gleiche Größe, aber vielleicht leicht schrumpfend?
        let size = map(i, 0, trail.length, playerSize * 0.5, playerSize);
        rect(pos.x, pos.y, size, size);
    }

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
