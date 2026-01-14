window.onload = function() {
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const centerX = 100;
const centerY = 100;
const radius = 50;

function draw(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const progress = Math.abs(Math.sin(timestamp / 500)); 
    
    const foodX = 300 - (progress * 200); 
    const foodOpacity = 1 - progress;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${foodOpacity})`;
    ctx.arc(foodX, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(centerX + 15, centerY - 20, 5, 0, 2 * Math.PI);
    ctx.fill();

    const mouthSize = progress * 0.15 * Math.PI;
    
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius + 2, -mouthSize, mouthSize);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
}       
