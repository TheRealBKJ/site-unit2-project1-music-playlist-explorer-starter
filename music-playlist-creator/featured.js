//file reuses a lot of code from script but made seperate file for best practice
//when page loaded add in the content
document.addEventListener("DOMContentLoaded", () => {
    buildFeatured();
})


// function takes care of both divs, copying a lot of code from script.js
function buildFeatured(){
    //fetch json data
    return fetch('data/data.json')
        .then(response => {
            if (!response) {
                throw new Error("No playlists Added");
            }
            return response.json()
        })
    .then(data =>{
        const playlistInfo = document.getElementById('playlist-holder');
        const songs = document.getElementById('song-holder');
        const array = Array.from(data);
        const randomPlaylist = randomDisplay(array)
        playlistInfo.innerHTML = `
            <img id ="featured-image" src = "${randomPlaylist.playlist.img}" alt ="photo of playlist"> </img>
            <h2 id="playlist-title"> ${randomPlaylist.playlist.title}<h2>
        `;

        songs.appendChild(randomPlaylist.songs);
    })
}


function randomDisplay(array){
    const randInd = Math.floor(Math.random() * array.length);
    const randData = array[randInd];
    let songList =  document.createDocumentFragment();
    randData.songs.forEach((song) =>{
        const songBox = document.createElement('div');
        songBox.className = 'song-box';
        songBox.innerHTML = `
            <img src="${song.image}" alt="Image of Song" class="song-thumbnail">
            <div class="song-details">
                <h4 id = 'song-title'> Song: ${song.song_name}</h4>
                <h4 id = 'artist-name'> Artist: ${song.artist_name}<h4>
                <h4 id = 'album-name'> Album: ${song.album_name}</h4>
                <h4 id="duration"> Duration: ${song.duration}</h4>
            </div>
        `;
        songList.appendChild(songBox);
        })

    return {
        playlist: {
            img : randData.playlist_art,
            title : randData.playlist_name
        },
        songs: songList
    }


}