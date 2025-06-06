// What I need to work on: define functions, consitency between semicolon use, spacing, maybe chage innerhtml for XSS attacks -> convert to textcontent when creating add playlist??

// loads the cards into page when page is rendered

document.addEventListener("DOMContentLoaded", () => {
    createCards();
})

//logic for making cards
//loads all the cards into playlist grid
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

//function called to create card individually for the for each loop
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
            <button class = "edit-button">Edit</button>
            <button class ="delete-button">Delete</button>
        </div>
    `;
    cardElement.dataset.dateAdded = card.date_added; //hidden element to sort later
    //adds the event listener for openingModal to each card
    cardElement.addEventListener('click', () => {
        openModal(card.playlist_name, card.playlist_art, card.playlist_author, card.songs);
    });

    //adds the like button feature to each card
    const likeButton = cardElement.querySelector('.likeButton');/* can access child elems easier */
    let liked = false;
    likeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // can lead to complicated situations, do it based on what was clicked
        liked = !liked;
        toggleLikes(likeButton, liked)
    });
    //adds functionality to delete buttonn
    const deleteButton = cardElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        cardElement.remove()
        return null
    });

    //pop up modal for editing, going to be async function bc only these params for editing a button 

    const editButton = cardElement.querySelector('.edit-button');
    editButton.addEventListener('click',(e) =>{
        e.stopPropagation();
        returnedElement = openEditModal(cardElement); // call an openModal that lets you change author and Name and then when its clicked off send back card Element HTML
        return cardElement
    });

    return cardElement; //returns card back to parent function
}

function openEditModal(cardElement){
    //current values grab em
    const authorTitle = cardElement.querySelector('.author-title').textContent;
    const playlistTitle = cardElement.querySelector('.playlist-title').textContent;

    //set boxes equal to curr values
    document.getElementById('edit-author-input').value = authorTitle;
    document.getElementById('edit-name-input').value = playlistTitle;


    //get what the user puts in 
    const editAuthorInput = document.getElementById('edit-author-input');
    const editNameInput = document.getElementById('edit-name-input');

    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'block';


    // Add event listener to close the modal when clicked outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
        editModal.style.display = 'none';
        }
    });


    // Add event listener to save changes when the modal is closed
    document.getElementById('save-changes').addEventListener('click', () => {

        // Get the new values from the input fields
        const newAuthorTitle = document.getElementById('edit-author-input').value;
        const newPlaylistTitle = document.getElementById('edit-name-input').value;

        // Update the card element with the new values
        cardElement.querySelector('.author-title').textContent = newAuthorTitle;
        cardElement.querySelector('.playlist-title').textContent = newPlaylistTitle;
        // Close the modal
        editModal.style.display = 'none';
    });
    // Add event listener to save changes when the span is clicked
    document.getElementById('save-span').addEventListener('click', () => {
        // Get the new values from the input fields
        const newAuthorTitle = document.getElementById('edit-author-input').value;
        const newPlaylistTitle = document.getElementById('edit-name-input').value;
        // Update the card element with the new values
        cardElement.querySelector('.author-title').textContent = newAuthorTitle;
        cardElement.querySelector('.playlist-title').textContent = newPlaylistTitle;
        // Close the modal
        editModal.style.display = 'none';
    });
}




//function to add or subtract like from song card
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

const modal = document.getElementById('playlistModal'); /* grabs the html for a modal for playlist did under creation of modal in card Element*/
const span = document.getElementsByClassName('close')[0];//gets the x button on modal
const cards = document.querySelectorAll(document.getElementById(''))/* get all id cards in website*/


// how to make modal easier to use and click off of close button and grey area
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* take all the cards and ad an event listener so when a card is clicked a modal of that card and its songs r rendered*/
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

    /* Shuffle logic for shuffling songs*/
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

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
    searchForm.value = '';
    cardGrid.innerHTML = '';
    createCards();
});


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





//code for stretch features


//how to get which sort to do and peform it, builds array of cards based on which one and then sorts
function sortCards(cards, sortBy) {

    switch (sortBy) { //switch case because not so many options
        case 'Name(A-Z)':
            cards.sort((a, b) => {
                const aName = a.querySelector('.playlist-title').textContent;//how to swap elements given two! selects with class playlist-title
                const bName = b.querySelector('.playlist-title').textContent;
                return aName.localeCompare(bName); // Alphabetical order
            });
            break;
        case 'Likes':
            cards.sort((a, b) => {
                const aLikes = parseInt(a.querySelector('#like-count').textContent.split(': ')[1]);
                const bLikes = parseInt(b.querySelector('#like-count').textContent.split(': ')[1]);//parse int to get actual integer value
                return bLikes - aLikes; // Descending order
            });
            break;
        default: // Date added
            cards.sort((a, b) => {
                const aDate = new Date(a.dataset.dateAdded);
                const bDate = new Date(b.dataset.dateAdded);//makes date out of dataset/hidden value i added in ceeateCard()

                return aDate.getTime() - bDate.getTime();//descending order
            });
            break;
    }
    return cards;
}


const selectElement = document.getElementById('dropdown'); //gets the dropdown id
const cardGrid = document.getElementById('playlist-grid'); // gets the entire grid of cards


selectElement.addEventListener('change', (event) => {
    const selectedValue = event.target.value;//get the value of what they just selected
    const cardsSwitch = Array.from(cardGrid.children); //turn card grids currently into an array
    const sortedCards = sortCards(cardsSwitch, selectedValue); //sort the array based on the input user gave
    cardGrid.innerHTML = ''; // Clear the existing cards
    sortedCards.forEach((card) => {
        cardGrid.appendChild(card); // Append each card individually and do this after to make sure sortedCards ran
    });
});


//search button and function


//renders cards that match criteria
function returnSearch(text) {
    const cards = Array.from(cardGrid.children); //array of cards
    const filteredCards = []; //cards that pass the filter
    if (text === '') {
        // Reset the card grid to its original state
        cardGrid.innerHTML = ' ';
        cards.forEach((card) => {
            cardGrid.appendChild(card);
        });
        return;
    }

    if (searchChoice.value == "Name") { //search by name
        cards.forEach((card) => {
            const cardName = card.querySelector('.playlist-title').textContent.toLowerCase();
            if (cardName.includes(text.toLowerCase())) {
                filteredCards.push(card);
            }

        })
    } else if (searchChoice.value == "Author") { // search by author
        cards.forEach((card) => {
            const cardName = card.querySelector('.author-title').textContent.toLowerCase(); //convert to lowercase
            if (cardName.includes(text.toLowerCase())) {
                filteredCards.push(card);
            }
        })
    }

    return filteredCards;
}

//define after the function
const searchChoice = document.getElementById('search-choice'); //what did they choose to search
const searchForm = document.getElementById('search-form'); //what did they say

//displays based on what they said
searchChoice.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'Name' || selectedValue === 'Author') {
        searchForm.style.display = 'block';
        searchForm.placeholder = `Search by ${selectedValue}`;
    } else {
        searchForm.style.display = 'none';
    }
});

// searches and appends and calls the actual function to search by
searchForm.addEventListener('input', (e) => {
    const searchText = e.target.value;
    const newCards = returnSearch(searchText);
    if (newCards.length > 0) {
        cardGrid.innerHTML = '';
        newCards.forEach((card) => {
            cardGrid.appendChild(card);
        })
    } else {
        // Reset the card grid to its original state
        cardGrid.innerHTML = ' ';
        Array.from(cardGrid.children).forEach((card) => {
            cardGrid.appendChild(card);
        });
    }
});
//clears form and adds back enw grid





