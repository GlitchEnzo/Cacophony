/// <reference path="Album.ts" />
/// <reference path="Artist.ts" />
/// <reference path="AudioPlayer.ts" />
/// <reference path="Genre.ts" />
/// <reference path="Playlist.ts" />
/// <reference path="ProgressBar.ts" />
/// <reference path="Song.ts" />

var player: AudioPlayer = null;
var playlist: Playlist = null;

var thelist: HTMLElement;
var header: HTMLElement;
var footer: HTMLElement;
var songTitle: HTMLElement;
var currentFolder: HTMLElement;
var progressBar: HTMLInputElement;
var searchbox: HTMLInputElement;
var currentTime: HTMLElement;
var duration: HTMLElement;

// hook up the OnPopState event to handle when someone tries navigating back or forward in history
window.onpopstate = (event) =>
{
    console.log("Pop State: " + JSON.stringify(event.state));

    if (event.state)
    {
        if (event.state.viewAllGenres)
        {
            playlist.ViewAllGenres(false);
        }
        else if (event.state.genre)
        {
            playlist.OpenGenre(event.state.genre);
        }
        else if (event.state.artist)
        {
            playlist.OpenArtist(event.state.artist);
        }
        else if (event.state.album)
        {
            playlist.OpenAlbum(event.state.album);
        }
    }
    else if (playlist) // we should just default to show all genres
    {
        playlist.ViewAllGenres(false);
    }
};

window.onresize = () =>
{
    // The size of the header and footer are fixed.  The list should take up all remaining space.
    thelist.style.height = window.innerHeight - header.clientHeight - footer.clientHeight + "px";
}

function search(event: KeyboardEvent)
{
    var query: string;
    if (event.keyCode == 8) // Backspace
    {
        query = searchbox.value.substr(0, searchbox.value.length - 1);
    }
    else if (event.keyCode == 13) // Enter
    {
        query = searchbox.value;
    }
    else
    {
        query = searchbox.value + String.fromCharCode(event.keyCode);
    }

    console.log("Searching: " + query);
    playlist.Search(query);
}

function searchClicked()
{
    if (searchbox.value == "Search") {
        searchbox.value = "";
    }
}

window.onload = () =>
{
    thelist = document.getElementById('thelist');
    header = document.getElementById('header');
    footer = document.getElementById('footer');
    songTitle = document.getElementById('songTitle');
    currentFolder = document.getElementById('currentFolder');
    progressBar = <HTMLInputElement>document.getElementById('progressBar');
    searchbox = <HTMLInputElement>document.getElementById('searchbox');
    currentTime = document.getElementById('currentTime');
    duration = document.getElementById('duration');

    // hide the address bar on mobile
    window.scrollTo(0, 1);

    player = new AudioPlayer();
    playlist = new Playlist("songs.xml");

    // The size of the header and footer are fixed.  The list should take up all remaining space.
    thelist.style.height = window.innerHeight - header.clientHeight - footer.clientHeight + "px";
};