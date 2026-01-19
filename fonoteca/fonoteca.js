
window.onload = () => {
    loadAlbums();
};

function loadAlbums() {
    console.log("Începem încărcarea albumelor...");

    fetch('albums.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Nu s-a putut descărca albums.json');
            }
            return response.json();
        })
        .then(albums => {
            const galleryDiv = document.getElementById('gallery');
            
            galleryDiv.innerHTML = '';

            albums.forEach((album, index) => {
                const card = document.createElement('div');
                card.classList.add('album-card');

                const img = document.createElement('img');
                img.src = 'images/' + album.image; 
                img.alt = album.name; 

                const title = document.createElement('h3');
                title.textContent = album.name; 

                card.appendChild(img);
                card.appendChild(title);

                galleryDiv.appendChild(card);

                card.addEventListener('click', () => {
                    console.log(`Ai dat click pe albumul cu indexul ${index}`);
                    loadAlbumDetails(index);
                });
            });
        })
        .catch(error => {
            console.error('Eroare critică la loadAlbums:', error);
            document.getElementById('gallery').innerHTML = '<p style="color:red">Eroare la încărcarea listei.</p>';
        });
}

function loadAlbumDetails(index) {
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = '<p>Se încarcă detaliile...</p>';

    const filename = `albums/${index}.json`;

    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Nu am găsit fișierul ${filename} (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(details => {
            let genresHtml = '-';
            if (details.genres && Array.isArray(details.genres)) {
                genresHtml = details.genres.join(', ');
            }
            

            const imageFile = details.image || details.cover || 'placeholder.jpg';
            const imagePath = 'images/' + imageFile;
            const detailTitle = details.title || details.name || 'Titlu Necunoscut';

            infoDiv.innerHTML = `
                <h1>${detailTitle}</h1>
                <h2 style="color: gray;">${details.artist}</h2>
                <hr>
                
                <img src="${imagePath}" style="float: right; margin-left: 20px; max-width: 250px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">

                <h3>Informații principale:</h3>
                <ul>
                    <li><strong>An:</strong> ${details.year || '-'}</li>
                    <li><strong>Genuri:</strong> ${genresHtml}</li>
                    <li><strong>Casă de discuri:</strong> ${details.label || '-'}</li>
                    <li><strong>Format:</strong> ${details.format || '-'}</li>
                </ul>

                ${details.description ? `<p><strong>Descriere:</strong> ${details.description}</p>` : ''}
            
                
                <div style="clear: both;"></div>
            `;
        })
}