let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let mouseX = 0;
let mouseY = 0;
let gunAngle = 0;
let gunX = 250;
let gunY = 450;
let targets = [];
let targetSpeed = 1;
let targetSpawnInterval = 200;
let ammo = 20;
let missedShots = 0;
let score = 0;
let isPaused = false;
let bullets = [];

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(bullet.x, bullet.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

// Add event listeners for mouse and touch input
document.addEventListener("mousedown", function(event) {
    if (event.button === 0) { // check if left mouse button was clicked
      fireBullet(); // call the shoot function when left mouse button is clicked
    }
  });

canvas.addEventListener("mousemove", function(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener("touchmove", function(e) {
    e.preventDefault();
    mouseX = e.touches[0].clientX - canvas.offsetLeft;
    mouseY = e.touches[0].clientY - canvas.offsetTop;
});

/*canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    if (isPaused) {
        isPaused = false;
    } else if (ammo > 0) {
        fireBullet();
    }
});
*/

canvas.addEventListener("touchend", function(e) {
    e.preventDefault();
    if (isPaused) {
        isPaused = false;
    } else if (ammo > 0) {
        fireBullet();
    }
});

document.addEventListener("keydown", function(e) {
    if (e.keyCode === 80) { // 'p' key
        isPaused = !isPaused;
    }
});

function calculateAngle(x, y) {
    let deltaX = x - 250;
    let deltaY = y - 450;
    return Math.atan2(deltaY, deltaX);
}

function drawGun() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(250, 450, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(gunX, gunY, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawTargets() {
    for (let i = 0; i < targets.length; i++) {
        let target = targets[i];
        target.x += target.speed;
        ctx.beginPath();
        ctx.fillStyle = target.color;
        ctx.arc(target.x, target.y, target.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        if (target.x > canvas.width + target.radius) {
            targets.splice(i, 1);
            i--;
            missedShots++;
        }
    }
}

function spawnTarget() {
    let target = {
        x: -50,
        y: Math.random() * (canvas.height - 100) + 50,
        radius: 30,
        color: "red",
        speed: targetSpeed
    };
    targets.push(target);
}

function drawAmmo() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Ammo: " + ammo, 20, 30);
}

function drawMissedShots() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Missed Shots: " + missedShots, 20, 60);
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 90);
}

function drawPauseMenu() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Press 'p' to resume", canvas.width / 2, canvas.height / 2 + 40);
}

function update() {
    if (!isPaused) {
        gunAngle = calculateAngle(mouseX, mouseY);
        gunX = 250 + Math.cos(gunAngle) * 50;
        gunY = 450 + Math.sin(gunAngle) * 50;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGun();
        drawBullets();
        drawTargets();
        drawAmmo();
        drawMissedShots();
        drawScore();

        if (ammo === 0) {
            clearInterval(gameLoop);
            alert("Game Over!\nScore: " + score + "\nMissed Shots: " + missedShots);
        }

        if (Math.random() < 1 / targetSpawnInterval) {
            spawnTarget();
        }

        for (let i = 0; i < targets.length; i++) {
            let target = targets[i];
            let distance = Math.sqrt((target.x - gunX) ** 2 + (target.y - gunY) ** 2);
            if (distance < target.radius + 20) {
                targets.splice(i, 1);
                i--;
                score++;
            }
        }

        // update bullets position and remove out of bounds bullets
        for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];
            bullet.x += Math.cos(bullet.angle) * bullet.speed;
            bullet.y += Math.sin(bullet.angle) * bullet.speed;
            if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
                bullets.splice(i, 1);
                i--;
            } else {
                // check if bullet hit any targets
                for (let j = 0; j < targets.length; j++) {
                    let target = targets[j];
                    let distance = Math.sqrt((target.x - bullet.x) ** 2 + (target.y - bullet.y) ** 2);
                    if (distance < target.radius) {
                        targets.splice(j, 1);
                        j--;
                        bullets.splice(i, 1);
                        i--;
                        score++;
                        break; // break out of the inner loop since the bullet can only hit one target
                    }
                }
            }
        }
    } else {
        drawPauseMenu();
    }
}



function fireBullet() {
    ammo--;
    let bullet = {
        x: gunX,
        y: gunY,
        angle: gunAngle,
        speed: 10
    };
    bullets.push(bullet);
}

let gameLoop = setInterval(update, 20);
