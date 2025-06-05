
const modal = document.getElementById('playlistModal'); /* grabs the html for a modal for playlist*/
const span = document.getElementsByClassName('close')[0];
const cards = document.querySelectorAll('.idcards')/* get all id cards in website*/

/* i am going to take all the cards and ad an event listener so when a card is clicked a modal of that card and its songs r rendered*/
function openModal(title,image,artist) {
    document.getElementById('playlistImage').src = image;
    document.getElementById('playlistName').innerText = title;
    document.getElementById('artistName').innerText= artist ;
    modal.style.display ="block" /* displays modal*/
}
/* add arrays to it later*/
cards.forEach((card) => {
    card.addEventListener('click',() =>{
        const title = card.querySelector('.playlistTitle').textContent;
        const image = card.querySelector('.cardimg').src;
        const artist = card.querySelector('.authorTitle').textContent;
        openModal(title,image,artist);
    });
});
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
    return cardElement;
}

document.addEventListener("DOMContentLoaded", () =>{
    createCards();
})

                
// how to create a card and load them in!

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}