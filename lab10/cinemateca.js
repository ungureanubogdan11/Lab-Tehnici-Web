document.addEventListener("DOMContentLoaded", () => {
    proceseazaXML();
});

function proceseazaXML() {
    const xmlScriptTag = document.getElementById("date-xml");
    
    if (!xmlScriptTag) {
        return;
    }

    const xmlText = xmlScriptTag.textContent;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    if (xmlDoc.querySelector("parsererror")) {
        return;
    }

    const container = document.getElementById("container-filme");
    const filme = xmlDoc.getElementsByTagName("film");

    for (let i = 0; i < filme.length; i++) {
        const film = filme[i];
        creazaElementFilm(film, container);
    }
}

function creazaElementFilm(filmXML, container) {
    const div = document.createElement("div");
    div.className = "film-box";

    const titlu = filmXML.getElementsByTagName("titlu")[0].textContent;
    const limba = filmXML.getElementsByTagName("titlu")[0].getAttribute("limba");
    const gen = filmXML.getElementsByTagName("gen")[0].textContent;
    const regizor = filmXML.getElementsByTagName("regizor")[0].textContent;
    const an = filmXML.getElementsByTagName("an_lansare")[0].textContent;
    const scor = filmXML.getElementsByTagName("scor")[0].textContent;

    const h2 = document.createElement("h2");
    h2.textContent = `${titlu} (${an})`;
    div.appendChild(h2);

    const ul = document.createElement("ul");

    const addRow = (label, val) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${label}:</strong> ${val}`;
        ul.appendChild(li);
    };

    addRow("Limba", limba);
    addRow("Gen", gen);
    addRow("Regizor", regizor);
    
    const liActori = document.createElement("li");
    liActori.innerHTML = "<strong>Actori:</strong>";
    const ulActori = document.createElement("ul");
    
    const actori = filmXML.getElementsByTagName("actor");
    for(let j=0; j<actori.length; j++) {
        const actorNode = actori[j];
        const nume = actorNode.getElementsByTagName("nume")[0].textContent;
        const personaj = actorNode.getElementsByTagName("personaj")[0].textContent;
        const rol = actorNode.getAttribute("rol");
        
        const liActor = document.createElement("li");
        liActor.innerText = `${nume} - ${personaj} (${rol})`;
        ulActori.appendChild(liActor);
    }
    liActori.appendChild(ulActori);
    ul.appendChild(liActori);

    addRow("Scor IMDb", scor);

    div.appendChild(ul);
    container.appendChild(div);
}