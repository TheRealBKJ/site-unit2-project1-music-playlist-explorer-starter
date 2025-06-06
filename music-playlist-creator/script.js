

// modal stuff above this

// What I need to work on: define functions, consitency between semicolon use, spacing, maybe chage innerhtml for XSS attacks -> convert to textcontent when creating add playlist??

//logic for making cards

function createCards() {
    return fetch('data/data.json')
        .then(response => {
            if (!response) {
                throw new Error("No playlists Added");
            }
            return response.json()
        })
        .then(data => {
            const cardGrid = document.getElementById('playlist-grid')
            data.forEach(card => {
                const playlistcard = createCard(card)
                cardGrid.appendChild(playlistcard)
            })
        })
        .catch(error => console.error('Error Loading:', error));

}

function createCard(card) {
    const cardElement = document.createElement('article')
    cardElement.classList.add('idcards')
    cardElement.innerHTML = `
        <img class="cardimg" src="${card.playlist_art}" alt="photo of playlist">
        <div id ="text-container-card">
            <h2 class="playlist-title">${card.playlist_name}</h2>
            <p class="author-title">${card.playlist_author}</p>
        </div>
        <div id= "button-container">
            <button class="likeButton">
                <img src="assets/img/heart.png" alt="like button" id= "likeimg">
                <span id="like-count">Like Count: ${card.like_count}</span>
            </button>
            <button id ="edit-button">Edit</button>
            <button id ="delete-button">Delete</button>
        </div>
    `;
    cardElement.addEventListener('click', () => {
        openModal(card.playlist_name, card.playlist_art, card.playlist_author, card.songs);
    });

    const likeButton = cardElement.querySelector('.likeButton');/* can access child elems easier */
    let liked = false;
    likeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // can lead to complicated situations, do it based on what was clicked
        liked = !liked;
        toggleLikes(likeButton, liked)
    });
    return cardElement;
}



function toggleLikes(likes, isLiked) {
    const likeCountNum = likes.querySelector('#like-count');
    let likeCount = parseInt(likeCountNum.textContent.split(': ')[1])/* Splits like count info */
    if (isLiked) {
        likeCount++;
        likes.classList.add('liked')/* diff styling for if liked!*/
    } else {
        likeCount--;
        likes.classList.remove('liked');
    }
    likeCountNum.textContent = `Like Count: ${likeCount}`;
}



// loads the cards into page when rendered
document.addEventListener("DOMContentLoaded", () => {
    createCards();
})






const modal = document.getElementById('playlistModal'); /* grabs the html for a modal for playlist*/
const span = document.getElementsByClassName('close')[0];
const cards = document.querySelectorAll('.idcards')/* get all id cards in website*/

/* i am going to take all the cards and ad an event listener so when a card is clicked a modal of that card and its songs r rendered*/
function openModal(title, image, artist, songs) {
    document.getElementById('playlistImage').src = image;
    document.getElementById('playlistName').innerText = title;
    document.getElementById('artistName').innerText = artist;


    /* Loads orignal songs in original order */
    const songsContent = document.getElementById('songsCont');
    songsContent.innerHTML = '';
    // assuming each json object has 3 or more songs which needs to be a thing
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const songElement = document.createElement('li')
        songElement.classList.add('songBox');
        songElement.innerHTML = `
            <img src="${song.image}" alt="Image of Song" class="song-thumbnail">
            <div class="song-details">
                <h4 id = 'song-title'> Song: ${song.song_name}</h4>
                <h4 id = 'artist-name'> Artist: ${song.artist_name}<h4>
                <h4 id = 'album-name'> Album: ${song.album_name}</h4>
                <h4 id="duration"> Duration: ${song.duration}</h4>
            </div>
        `;
        songsContent.appendChild(songElement);
    }

    /* Shuffle logic*/
    const shuffleButton = document.getElementById('shuffle-button')
    shuffleButton.addEventListener('click', () => {
        const songs = songsContent.children;
        const array = Array.from(songs);
        const shuffledSongs = shuffle(array)
        songsContent.innerHTML = '';
        shuffledSongs.forEach((shuffleSong) => {
            songsContent.appendChild(shuffleSong);
        });
    });
    modal.style.display = "block" /* displays modal*/
}



/* shuffle function from stackOverFlow*/
function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}





/* add arrays to it later*/
cards.forEach((card) => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.playlistTitle').textContent;
        const image = card.querySelector('.cardimg').src;
        const artist = card.querySelector('.authorTitle').textContent;

        openModal(title, image, artist, songs);
    });
});

// how to make modal easier to use and click off of close button and grey area
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}






