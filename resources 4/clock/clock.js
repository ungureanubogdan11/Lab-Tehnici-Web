window.onload = function() {
    const canvas = document.getElementById('canvas'); 
    
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');

    function drawClock() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.fillStyle = '#1a1a1a';
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.fillRect(centerX - 110, centerY - 40, 220, 80);
        ctx.strokeRect(centerX - 110, centerY - 40, 220, 80);

        const acum = new Date();
        const ore = String(acum.getHours()).padStart(2, '0');
        const minute = String(acum.getMinutes()).padStart(2, '0');
        const secunde = String(acum.getSeconds()).padStart(2, '0');
        const timpString = ore + ":" + minute + ":" + secunde;

        ctx.fillStyle = 'red'; 
        ctx.font = 'bold 50px "digital-clock-font", monospace'; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(timpString, centerX, centerY);
    }

    document.fonts.ready.then(function() {
        drawClock();
        setInterval(drawClock, 1000); 
    });
};