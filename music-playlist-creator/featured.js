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
        playlistInfo.innerHTML = randomPlaylist.playlist;
        songs.innerHTML = randomPlaylist.songs
    })
}


function randomDisplay(array){

}