
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



span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}