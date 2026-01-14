let canvas, ctx, doorPath;
let doorColor = 'red';

function init() {
    canvas = document.getElementById('canvdoor');
    
    if (!canvas) {
        console.error("Eroare: Nu am găsit un canvas cu ID-ul 'canvdoor' în HTML.");
        return;
    }
    
    ctx = canvas.getContext('2d');
    
    canvas.addEventListener('click', colorBlack);
    
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 8;
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.moveTo(60, 250);
    ctx.lineTo(60, 50);
    ctx.lineTo(210, 50);
    ctx.lineTo(210, 250);
    ctx.stroke();

    doorPath = new Path2D();
    doorPath.moveTo(65, 60);    
    doorPath.lineTo(65, 240);   
    doorPath.lineTo(180, 280);
    doorPath.lineTo(180, 20);
    doorPath.closePath();

    ctx.fillStyle = doorColor;
    ctx.fill(doorPath);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(155, 150, 6, 0, Math.PI * 2);
    ctx.fill();
}

function colorBlack(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (ctx.isPointInPath(doorPath, x, y)) {
        doorColor = 'black';
        draw();
    }
}

window.onload = init;