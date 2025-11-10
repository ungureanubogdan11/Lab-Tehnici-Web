let nume = prompt("Hai să jucăm X și 0. Cum te cheamă?");

let caracter = prompt(`Buna ${nume} . Cu ce vrei sa joci? X sau 0? X Incepe primul.`);
let tabla1 = [];
let tabla2 = [];
for(let i = 0; i < 9; ++i) {
    tabla1[i] = tabla2[i] = "?";
} 



function printtt(tabla) {
    let rep = [];
    for(let i = 0; i < 3; ++i) {
        for(let j = 0; j < 3; ++j) {
            rep += "|";
            rep += tabla[i * 3 + j];
        }
        rep += "|";
        rep += "\n";
    }
    return rep;
}

function valid(poz, tabla) {
    return (1 <= poz && poz <= 9 && tabla[poz - 1] == "?");
}

function win(tabla) {
    for(let i = 0; i < 3; ++i) {
        if(tabla[i * 3] != "?" && tabla[i * 3] == tabla[i * 3 + 1] && tabla[i * 3] == tabla[i * 3 + 2]) return tabla[i * 3];
        if(tabla[i] != "?" && tabla[i + 3] == tabla[i] && tabla[i] == tabla[i + 6]) return tabla[i];
    }
    if(tabla[0] != "?" && tabla[0] == tabla[4] && tabla[0] == tabla[8]) return tabla[0];
    if(tabla[2] != "?" && tabla[2] == tabla[4] && tabla[2] == tabla[6]) return tabla[2];
    return 0;
}

function draw(tabla) {
    if(win(tabla)) {
        return 0;
    }

    for(let i = 0; i < 9; ++i) {
        if(tabla[i] == "?") return 0;
    }
    return 1;
}

function computer_move(tabla)
{
    let ok = 0, poz;
    while(!ok) {
        poz = Math.floor(Math.random() * 1000) % 9 + 1;
        if(valid(poz, tabla)) ok = 1;
    }
    let computer_character;
    if(caracter == "X") computer_character = "0";
    else computer_character = "X";
    tabla[poz - 1] = computer_character;
    
}

let end = 0, stare1 = 0, stare2 = 0;
while(!end) {
    let ok = 0;
    while(!ok) {
        let t1 = tabla1;
        let t2 = tabla2;
        if(stare1 == 0) t1 = printtt(tabla1);
        if(stare2 == 0) t2 = printtt(tabla2);
        let poz = prompt(`${t1}\n${t2}\nUnde vrei sa pui urmatoarele semne?`);
        let poz1 = poz[0];
        let poz2 = poz[2];
        ok = (stare1 || valid(poz1, tabla1)) && (stare2 || valid(poz2, tabla2));
        if(!ok) alert("Una dintre pozitii nu e buna."); 
        else {
            if(stare1 == 0) tabla1[poz1 - 1] = caracter;
            if(stare2 == 0) tabla2[poz2 - 1] = caracter;
        }
    }

    if(stare1 == 0) stare1 = draw(tabla1);
    if(stare2 == 0) stare2 = draw(tabla2);

    if(stare1 & stare2) {
        end = 1;
    }
    if(stare1 == 1) tabla1 = [], tabla1 = "Remiza!";
    if(stare2 == 1) tabla2 = [], tabla2 = "Remiza!";
    if(end) break;

    if(stare1 == 0) stare1 = win(tabla1);
    if(stare2 == 0) stare2 = win(tabla2);

    if(stare1 && stare2) {
        end = 1;
    }
    if(stare1) {
        if(stare1 == caracter) tabla1 = [], tabla1 = `Bravo, ${nume}, ai câștigat!`;
        else tabla1 = [], tabla1 = "Ai pierdut :(";
    }
    if(stare2) {
        if(stare2 == caracter) tabla2 = [], tabla2 = `Bravo, ${nume}, ai câștigat!`;
        else tabla2 = [], tabla2 = "Ai pierdut :(";
    }
    if(end) break;
    
    if(stare1 == 0) computer_move(tabla1);
    if(stare2 == 0) computer_move(tabla2);
    
    if(stare1 == 0) stare1 = draw(tabla1);
    if(stare2 == 0) stare2 = draw(tabla2);

    if(stare1 && stare2) {
        end = 1;
    }
    if(stare1 == 1) tabla1 = [], tabla1 = "Remiza!";
    if(stare2 == 1) tabla2 = [], tabla2 = "Remiza!";
    if(end) break;

    if(stare1 == 0) stare1 = win(tabla1);
    if(stare2 == 0) stare2 = win(tabla2);

    if(stare1 && stare2) {
        end = 1;
    }
    if(stare1) {
        if(stare1 == caracter) tabla1 = [], tabla1 = `Bravo, ${nume}, ai câștigat!`;
        else tabla1 = "Ai pierdut :(";
    }
    if(stare2) {
        if(stare2 == caracter) tabla2 = [], tabla2 = `Bravo, ${nume}, ai câștigat!`;
        else tabla2 = "Ai pierdut :(";
        
    }
    if(end) break;
}

alert(`${tabla1}\n${tabla2}`);
