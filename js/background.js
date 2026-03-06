// get the canvas and the context so we can draw
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// button to spawn more flies
const spawnButton = document.getElementById("spawn");

// make canvas take up the full window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// call it once and also update if window changes size
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// array to hold all the flies
let particles = [];

// fly particle
class Particle {
    constructor(x, y) {
        this.x = x; // x position
        this.y = y; // y position
        this.vx = Math.random() - 0.5; // horizontal speed
        this.vy = Math.random() - 0.5; // vertical speed
    }

    // move the fly
    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    // draw little wings
    draw_wings() {
        const wings = 2; // how many wings each fly has
        const radius = 2; // size of the fly body
        const wingLength = 2.5; // how long the wings stick out

        // angles for the wings, tilted a bit so they look like real wings
        const startAngle = -Math.PI * 0.15; 
        const endAngle = -Math.PI * 0.85; 
    
        for (let i = 0; i < wings; i++) {
            const t = i / (wings - 1); // fraction across wings
            const angle = startAngle + (endAngle - startAngle) * t;

            // starting point at the edge of the fly
            const startX = this.x + Math.cos(angle) * radius;
            const startY = this.y + Math.sin(angle) * radius;

            // end point a little farther out
            const endX = this.x + Math.cos(angle) * (radius + wingLength);
            const endY = this.y + Math.sin(angle) * (radius + wingLength);

            // draw the wing line
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
    }

    // draw the fly body
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

// create some initial flies
for (let i = 0; i < 150; i++) {
    particles.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
    ));
}

// main animation loop
function loop() {

    // clear everything from last frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update and draw every fly
    for (let particle of particles) {
        particle.update();       // move it
        particle.draw_wings();   // draw wings first so they appear under the body
        particle.draw();         // draw body on top
    }

    requestAnimationFrame(loop); // repeat forever
}

// start the loop
loop();

// when the button is clicked, spawn more flies
spawnButton.addEventListener("click", spawnFlies)

function spawnFlies() {
    for (let i = 0; i < 1000000; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }

}


