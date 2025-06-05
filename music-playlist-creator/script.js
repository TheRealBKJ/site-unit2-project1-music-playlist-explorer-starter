

// modal stuff above this


//logic for making cards

function createCards(){
    return fetch('data/data.json')
    .then(response =>{
        if (!response){
            throw new Error("No playlists Added");
        }
        return response.json()
    })
    .then(data =>{
        const cardGrid = document.getElementById('playlist-grid')
        data.forEach(card =>{
            const playlistcard = createCard(card)
            cardGrid.appendChild(playlistcard)
        })
    })
    .catch(error => console.error('Error Loading:', error));


}

function createCard(card){
    const cardElement = document.createElement('article')
    cardElement.classList.add('idcards')
    cardElement.innerHTML = `
        <img class="cardimg" src="${card.playlist_art}" alt="photo of playlist">
        <h2 class="playlistTitle">${card.playlist_name}</h2>
        <p class="authorTitle">${card.playlist_author}</p>
        <button class="likeButton">
            <img src="assets/img/heart.png" alt="like button">
            <span>Like Count: 0</span>
        </button>
    `;
    cardElement.addEventListener('click', () =>{
        openModal(card.playlist_name,card.playlist_art, card.playlist_author, card.songs);
    });
    return cardElement;
}

// loads the cards into page when rendered
document.addEventListener("DOMContentLoaded", () =>{
    createCards();
})






const modal = document.getElementById('playlistModal'); /* grabs the html for a modal for playlist*/
const span = document.getElementsByClassName('close')[0];
const cards = document.querySelectorAll('.idcards')/* get all id cards in website*/

/* i am going to take all the cards and ad an event listener so when a card is clicked a modal of that card and its songs r rendered*/
function openModal(title,image,artist,songs) {
    document.getElementById('playlistImage').src = image;
    document.getElementById('playlistName').innerText = title;
    document.getElementById('artistName').innerText= artist ;
    const songsContent = document.getElementById('songsCont');
    songsContent.innerHTML = '';
    // assuming each json object has 3 or more songs which needs to be a thing
    for (let i = 0; i < 3; i++){
        const song = songs[i];
        const songElement = document.createElement('li')
        songElement.innerHTML =`
            <img src="${song.image}" alt="Image of Song" class="song-thumbnail">
            <div class="song-details">
                <h4 id = 'song-title'> ${song.song_name}</h4>
                <br>
                <h4 id = 'artist-name'>${song.artist_name}<h4>
                <br>
                <h4 id = 'album-name'>${song.album_name}</h4>
                
            </div>
            <div id="duration">
                <h4>${song.duration}</h4>
            </div>
        `;
        songsContent.appendChild(songElement);
    }
    modal.style.display ="block" /* displays modal*/
}
/* add arrays to it later*/
cards.forEach((card) => {
    card.addEventListener('click',() =>{
        const title = card.querySelector('.playlistTitle').textContent;
        const image = card.querySelector('.cardimg').src;
        const artist = card.querySelector('.authorTitle').textContent;

        openModal(title,image,artist, songs);
    });
});

// how to make modal easier to use and click off of close button and grey area
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// how to append 3 song boxes, use this 
function createSongboxes (){
    console.log("3 songs added")
}






                
