function drawTable(nrows, ncols) {
/* 
   1. Generați un tabel cu 'nrows' rânduri și 'ncols' coloane 
   și adăugați-l în div-ul cu id-ul 'container'. 
*/

   const container = document.getElementById("container");
   const table = document.createElement("table")

   for(let i = 0; i < nrows; ++i) {
      const row = document.createElement("tr");
     
      for(let j = 0; j < ncols; ++j) {
         
         const cell = document.createElement("td");
         cell.className = `r${i} c${j}`;

         row.appendChild(cell);
      }
      table.appendChild(row);
   }

   container.appendChild(table);
}

function colorCol(column, color) {
/*
   2. Colorați coloana 'column' din tabla de desenat cu culoarea 'color'.
*/

   const columns = document.getElementsByClassName(`c${column}`);
   for(let i = 0; i < columns.length; ++i) {
      columns[i].style.backgroundColor = color;
   }
}

function colorRow(row, color) {
/*
   2. Colorați rândul 'row' din tabla de desenat cu culoarea 'color'.
*/
   const rows = document.getElementsByClassName(`r${row}`);
   for(let i = 0; i < rows.length; ++i) {
      rows[i].style.backgroundColor = color;
   }
}

function rainbow(target) {
   let colors = ["rgb(255, 0, 0)", "rgb(255, 154, 0)", "rgb(240, 240, 0)", "rgb(79, 220, 74)", "rgb(63, 218, 216)", "rgb(47, 201, 226)", "rgb(28, 127, 238)", "rgb(95, 21, 242)", "rgb(186, 12, 248)", "rgb(251, 7, 217)"];
/*
   3. Desenați un curcubeu pe verticală sau orizontală conform argumentului 'target' folosind culorile din 'colors' și funcțiile 'colorCol' și 'colorRow'.     
*/
   const table = document.querySelector("table");
   if(target === "row") {
      const rows = table.rows.length;
      const color_length = Math.floor(rows / colors.length);
      // console.log(color_length);
      let cnt = 0, k = 0;
      for(let i = 0; i < rows; ++i, cnt++) {
         if(cnt >= color_length) cnt = 0, k++;
         colorRow(i, colors[k]);
      }
   }
   else {
      const cols = table.rows[0].cells.length;
      const color_length = Math.floor(cols / colors.length);
      let cnt = 0, k = 0;
      for(let i = 0; i < cols; ++i, cnt++) {
         if(cnt >= color_length) cnt = 0, k++;
         colorCol(i, colors[k]);
      }
      
   }
}

function getNthChild(element, n) {
/*
   4. Întoarceți al n-lea element copil al unui element dat ca argument.
*/ 
   if(n >= 0 && n <= element.children.length)  return element.children[n - 1];
   return null;
};

function drawPixel(row, col, color) {	
/*
   5. Colorați celula de la linia 'row' și coloana 'col' cu culoarea `color'.
*/
   cell = document.getElementsByClassName(`r${row - 1} c${col - 1}`);
   cell[0].style.backgroundColor = color;

}

function drawLine(r1, c1, r2, c2, color) {
/*
   6. Desenați o linie (orizontală sau verticală) de la celula aflată 
   pe linia 'r1', coloana 'c1' la celula de pe linia 'r2', coloana 'c2'
   folosind culoarea 'color'. 
   Hint: verificați mai întâi că punctele (r1, c1) și (r2, c2) definesc
   într-adevăr o linie paralelă cu una dintre axe.
*/

   if(r1 == r2) {
      for(let i = Math.min(c1, c2); i < Math.max(c1, c2); ++i) {
         drawPixel(r1, i, color);      
      }
   }  
   else if(c1 == c2) {
      for(let i = Math.min(r1, r2); i < Math.max(r1, r2); ++i) {
         drawPixel(i, c1, color);
      }
   }
}

function drawRect(r1, c1, r2, c2, color) {
/*
   7. Desenați, folosind culoarea 'color', un dreptunghi cu colțul din 
   stânga sus în celula de pe linia 'r1', coloana 'c1', și cu 
   colțul din dreapta jos în celula de pe linia 'r2', coloana 'c2'.
*/ 
   for(let i = r1; i < r2; ++i) {
      drawLine(i, c1, i, c2, color);
   }
}

function drawPixelExt(row, col, color) {
/*
   8. Colorați celula de la linia 'row' și coloana 'col' cu culoarea 'color'.
   Dacă celula nu există, extindeți tabla de desenat în mod corespunzător.
*/ 
   const table = document.querySelector("table");
   let rows = table.rows.length;
   let cols = table.rows[0].cells.length;
   
   if(row >= rows) {
      for(let i = rows; i < row; ++i) {
         const new_row = document.createElement("tr");
         for(let j = 0; j < cols; ++j) {
            const cell = document.createElement("td");
            new_row.appendChild(cell);
            cell.className = `r${i} c${j}`;
         }
         table.appendChild(new_row);
      }
   }

   rows = table.rows.length;

   if(col >= cols) {
      for(let i = 0; i < rows; ++i) {
         const current_row = table.rows[i];
         for(let j = cols; j < col; ++j) {
            const cell = document.createElement("td");
            current_row.appendChild(cell);
            cell.className = `r${i} c${j}`;
         }
      }
   }

   drawPixel(row, col, color);
}

function colorMixer(colorA, colorB, amount){
   let cA = colorA * (1 - amount);
   let cB = colorB * (amount);
   return parseInt(cA + cB);
}

function drawPixelAmount(row, col, color, amount) {
   /* 
   9. Colorați celula la linia 'row' și coloana 'col' cu culoarea 'color'
   în funcție de ponderea 'amount' primită ca argument (valoare între 0 și 1). 
   Dacă 'amount' are valoarea:
   1, atunci celula va fi colorată cu 'color'
   0, atunci celula își va păstra culoarea inițială
   pentru orice altă valoare, culoarea inițială și cea dată de argumentul 
   'color' vor fi amestecate. De exemplu, dacă ponderea este 0.5, atunci 
   culoarea inițială și cea nouă vor fi amestecate în proporții egale (50%). 
   */

   /*   
   Hint 1: folosiți funcția colorMixer de mai sus.

   Hint 2: pentru un argument 'color' de forma 'rgb(x,y,z)' puteți folosi
   let newColorArray = color.match(/\d+/g); 
   pentru a obține un Array cu trei elemente, corespunzătoare valorilor
   asociate celor trei culori - newColorArray = [x, y, z]
   
   Hint 3: pentru a afla culoarea de fundal a unui element puteți folosi
   metoda getComputedStyle(element). Accesând proprietatea backgroundColor 
   a obiectului întors, veți obține un string de forma 'rgb(x,y,z)'.
   */

   if(amount >= 1) {
      drawPixel(row, col, color);
      return;
   }
   if(amount <= 0) {
      return;
   }

   const table = element.querySelector("table");
   const cell = table.rows[row - 1].cells[col - 1];

   let current_color = window.getComputedStyle(cell).backgroundColor;
   let current_color_array = current_color.match(/\d+/g).map(Number);
   let new_color_array = color.match(/\d+/g).map(Number);

   let new_R = colorMixer(current_color_array[0], new_color_array[0], amount);
   let new_G = colorMixer(current_color_array[1], new_color_array[1], amount);
   let new_B = colorMixer(current_color_array[2], new_color_array[2], amount);

   cell.style.backgroundColor = `rgb(${new_R}, ${new_G}, ${new_B})`;
}

function delRow(row) {
/*
   10. Ștergeți linia cu numărul 'row' din tabla de desenat.
*/

   const table = document.querySelector("table");

   if(row <= 0 || row > table.rows.length) return;

   table.deleteRow(row - 1);

   for(let i = 0; i < table.rows.length; ++i) {
      current_row = table.rows[i];
      for(let j = 0; j < table.rows[0].cells.length; ++j) {
         current_row.cells[j].className = `r${i} c${j}`;
      }
   }

}

function delCol(col) {
/*
   10. Ștergeți coloana cu numărul 'col' din tabla de desenat.
*/

   const table = document.querySelector("table");
   
   if(col <= 0 || row > table.rows[0].cells.length) return;

   for(let i = 0; i < table.rows.length; ++i) {
      cell = table.rows[i].cells[col];
      table.rows[i].deleteCell(col - 1);
   }

   for(let i = 0; i < table.rows.length; ++i) {
      current_row = table.rows[i];
      for(let j = 0; j < table.rows[0].cells.length; ++j) {
         current_row.cells[j].className = `r${i} c${j}`;
      }
   }

}

function shiftRow(row, pos) {
   const table = document.querySelector("table");
   // Row numbers are 1-based, so we use row - 1 for 0-based index.
   const targetRow = table.rows[row - 1]; 

   const children = targetRow.cells;
   const numCells = children.length;
    
   pos = pos % numCells; // Normalize position
    
   if (pos === 0 || numCells <= 1) return; 


   for (let i = 0; i < pos; ++i) {
      targetRow.insertBefore(targetRow.lastElementChild, targetRow.firstElementChild);
   }

   for(let j = 0; j < table.rows[0].cells.length; ++j) {
      targetRow.cells[j].className = `r${row - 1} c${j}`;
   }
}

function jumble() {
/*
   12. Folosiți funcția 'shiftRow' pentru a aplica o permutare circulară
   cu un număr aleator de poziții fiecărei linii din tabla de desenat.
*/
   const table = document.querySelector("table");
   for(let i = 1; i <= table.rows.length; ++i) {
      let random_number = Math.floor(Math.random() * 1000);
      shiftRow(i, random_number);
   }

}

function clickPixel(event) {
   const cell = event.target;
   if(cell.tagName !== 'TD') return;
   let row = cell.parentElement.rowIndex + 1;
   let col = cell.cellIndex + 1;
   const color = localStorage.getItem("COLOR") || "whitesmoke";
   drawPixel(row, col, color);
}

function transpose() {
/*
   13. Transformați tabla de desenat în transpusa ei.
*/
}

function flip(element) {
/*
   14. Inversați ordinea copiilor obiectului DOM 'element' primit ca argument.
*/
}

function mirror() {
/*
   15. Oglindiți pe orizontală tabla de desenat: luați jumătatea stângă a tablei, 
   aplicați-i o transformare flip și copiați-o în partea dreaptă a tablei.
*/
}

function smear(row, col, amount) {
/*
   16. Întindeți culoarea unei celule de pe linia 'row' și coloana 'col' în celulele
   învecinate la dreapta, conform ponderii date de 'amount' (valoare între 0 și 1).
   Cu colorarea fiecărei celule la dreapta, valoarea ponderii se înjumătățește. 
   Hint: folosiți funcția 'drawPixelAmount'.
*/
}

function clear() {
   const table = document.querySelector("table");
   for(let i = 0; i < table.rows.length; ++i) {
      for(let j = 0; j < table.rows[i].cells.length; ++j) {
         const cell = document.getElementsByClassName(`r${i} c${j}`)[0];
         cell.style.backgroundColor = "whitesmoke";
      }
   }
}


function change_color(event) {
   localStorage.setItem("COLOR", event.target.value);
}

window.onload = function(){
   const rows = 30;
   const cols = 30;	
   drawTable(rows, cols);
   // rainbow("row");
   // drawLine(2, 2, 2, 25, "green");
   // drawRect(10, 5, 15, 20, "green");
   // drawPixelExt(35, 35, "green");
   // drawPixelExt(45, 40, "pink");
   // jumble();

   const table = document.querySelector("table");
   table.addEventListener("click", clickPixel);

   document.getElementById("color_for_everything").addEventListener("input", change_color);

   document.getElementById("h_rainbow").onclick = function() {
      rainbow("row");
   }
   
   document.getElementById("v_rainbow").onclick = function() {
      rainbow();
   }
   document.getElementById("jumble_button").onclick = function() {
      jumble();
   }
   document.getElementById("clear_button").onclick = function() {
      clear();
   }
}


