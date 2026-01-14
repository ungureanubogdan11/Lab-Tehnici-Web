let curr_scale = 1;
const min_scale = 0.2;
const max_scale = 2;
let current_margin_x = 0;
let current_margin_y = 0;

function move_img(x, y)
{
    const imagine = document.getElementById("vizor").children[0];
    const vizor = document.getElementById("vizor");
    let margin_top = parseFloat(window.getComputedStyle(imagine).marginTop);
    let margin_left = parseFloat(window.getComputedStyle(imagine).marginLeft);


    let width = parseFloat(imagine.naturalWidth) - parseFloat(vizor.clientHeight);
    let height = parseFloat(imagine.naturalHeight) - parseFloat(vizor.clientHeight);

    margin_top += x * 20;
    margin_left += y * 20;
    
    

    margin_top = Math.min((curr_scale - 1) * height, margin_top);
    margin_left = Math.min((curr_scale - 1) * width, margin_left);
    
    margin_top = Math.max(-height * curr_scale, margin_top);
    margin_left = Math.max(-width * curr_scale, margin_left);
    
    imagine.style.marginTop = `${margin_top}px`;
    imagine.style.marginLeft = `${margin_left}px`;
}

function zoom(x) {
    const imagine = document.getElementById("vizor").children[0];
    curr_scale += 0.1 * x;
    curr_scale = Math.min(max_scale, curr_scale);
    curr_scale = Math.max(min_scale, curr_scale);

    imagine.style.transform = `scale(${curr_scale})`;

}

function take_photo(event) {
    const vizor = document.getElementById("vizor");

    const clona = vizor.cloneNode(true);
    clona.removeAttribute("id");
    clona.classList.add("imagine_clona");

    const flash_overlay = document.createElement('div');
    flash_overlay.id = 'flash-animation';
    flash_overlay.style.position = 'absolute';
    flash_overlay.style.top = '0';
    flash_overlay.style.left = '0';
    flash_overlay.style.width = '100%';
    flash_overlay.style.height = '100%';
    flash_overlay.style.backgroundColor = 'white';
    flash_overlay.style.opacity = '0'; 
    flash_overlay.style.transition = 'opacity 0.05s ease-in-out'; 
    flash_overlay.style.zIndex = '100'; 

    vizor.appendChild(flash_overlay);

    setTimeout(() => {
        flash_overlay.style.opacity = '1'; 
    }, 1); 

    setTimeout(() => {
        flash_overlay.style.opacity = '0'; 
        setTimeout(() => {
            vizor.removeChild(flash_overlay);
        }, 50); 
    }, 100);

    return clona;

}

function apply_timer() {
    const timer = document.getElementById("timer");
    let seconds_left = 5;

    timer.textContent = `${seconds_left} secunde pana la captura`;
    timer.style.display = 'block'; 

    let interval = setInterval(() => {
        seconds_left--;
        timer.textContent = `${seconds_left} secunde pana la captura`;
        
        if(seconds_left <= 0) {
            clearInterval(interval);
        }

    }, 1000);

    setTimeout(() => {
        captured_image = take_photo({ key: 's' });
        captured_image.style.transform = "scale(0.5)";
        const galerie = document.getElementById("galerie");
        if(galerie.children.length == 3) galerie.removeChild(galerie.children[0]);
        console.log(galerie.children.length);
        galerie.appendChild(captured_image);
        const timer = document.getElementById("timer");
        timer.textContent = "";
    }, 5000);
}

function burst_images() {
    let burst_interval = setInterval(() => {
        captured_image = take_photo({ key: 's' });
        captured_image.style.transform = "scale(0.5)";
        const galerie = document.getElementById("galerie");
        if(galerie.children.length == 3) galerie.removeChild(galerie.children[0]);
        console.log(galerie.children.length);
        galerie.appendChild(captured_image);
        const timer = document.getElementById("timer");
        timer.textContent = "";
    }, 500);

    setTimeout(() => {
        clearInterval(burst_interval);
    }, 2000)
}

window.onload = function(){
    const imagine = document.getElementById("vizor").children[0];
    imagine.style.transformOrigin = "center center";
    imagine.style.marginTop = '0px';
    imagine.style.marginLeft = '0px';

    document.body.onkeyup = function(event){
        switch(event.key) {
            case "ArrowUp": 
                move_img(1, 0);    
                break;
            case "ArrowDown":   
                move_img(-1, 0);     
                break;
            case "ArrowLeft":
                move_img(0, 1);    
                break;
            case "ArrowRight":    
                move_img(0, -1);   
                break;
            case "=":    
            case "+":
                zoom(1);
                break;
            case "-":
                zoom(-1);
                break;
            case "s":
            case "S":
                const captured_image = take_photo(event);
                captured_image.style.transform = "scale(0.5)";
                captured_image.style.marginLeft = "0";
                captured_image.style.marginRght = "0";
                captured_image.style.marginTop = "0";
                captured_image.style.marginBottom = "0";
                const galerie = document.getElementById("galerie");
                if(galerie.children.length == 3) galerie.removeChild(galerie.children[0]);
                console.log(galerie.children.length);
                galerie.appendChild(captured_image);
                break;
            case "t":
            case "T":
                apply_timer();
                break;
            case "b":
            case "B":
                burst_images();
                break;
        }
    }
    /* 
    ... 
    */
}


