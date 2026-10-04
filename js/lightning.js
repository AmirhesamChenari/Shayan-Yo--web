const canvas = document.getElementById("lightning-background");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;

let bolt = null;
let flash = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createBolt() {
    const points = [];

    let x = width * (0.2 + Math.random() * 0.6);
    let y = -20;

    points.push({ x, y });

    while (y < height * 0.85) {
        x += (Math.random() - 0.5) * 100;
        y += 20 + Math.random() * 35;

        points.push({ x, y });
    }

    return points;
}

function drawBolt(points, lineWidth, opacity) {
    if (!points.length) {
        return;
    }

    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.strokeStyle = `rgba(190, 220, 255, ${opacity})`;

    ctx.lineWidth = lineWidth;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.shadowColor = "#8fc8ff";
    ctx.shadowBlur = 25;

    ctx.stroke();

    ctx.shadowBlur = 0;
}

function strike() {
    bolt = createBolt();

    flash = 0.3;

    setTimeout(() => {
        flash = 0.15;
    }, 80);

    setTimeout(() => {
        bolt = null;
    }, 250);
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    if (bolt) {
        drawBolt(bolt, 16, 0.08);
        drawBolt(bolt, 7, 0.15);
        drawBolt(bolt, 3, 0.5);
        drawBolt(bolt, 1.5, 1);
    }

    if (flash > 0) {
        ctx.fillStyle = `rgba(200, 225, 255, ${flash})`;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );

        flash *= 0.75;

        if (flash < 0.01) {
            flash = 0;
        }
    }

    requestAnimationFrame(animate);
}

function randomStrike() {
    strike();

    const delay = 2000 + Math.random() * 4000;

    setTimeout(randomStrike, delay);
}

window.addEventListener("resize", resize);

resize();
animate();

setTimeout(randomStrike, 1000);