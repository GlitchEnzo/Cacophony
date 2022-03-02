class Playlist
{
    genres: Genre[] = [];
    artists: Artist[] = [];
    albums: Album[] = [];
    songs: Song[] = [];

    selectedGenre: string = "";
    selectedArtist: string = "";

    /**
     * The index in the playlist of the song that is currently playing. 
     */
    currentSongIndex: number = 0;

    /**
     * The actual playlist of songs queued up to play. 
     */
    playlist: string[] = [];

    constructor(xmlFilePath: string)
    {
        // filter by Genres, Artists, Albums, or Songs
        // Genres --> List of Artists
        // Artists --> List of Albums
        // Albums --> List of Songs
        // Songs --> Nothing

        // load the songs XML file
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlFilePath, false);
        xmlhttp.send();
        var xmlDoc = xmlhttp.responseXML;
        var songsElement = xmlDoc.firstElementChild;
        //var allSongs = songsElement.getElementsByClassName("Song");
        var allSongs = songsElement.children;

        // parse the XML list of songs
        for (var i = 0; i < allSongs.length; i++)
        {
            var song = new Song();
            song.genre = allSongs[i].attributes.getNamedItem("genre").value;
            song.artist = allSongs[i].attributes.getNamedItem("artist").value;
            song.album = allSongs[i].attributes.getNamedItem("album").value;
            song.track = allSongs[i].attributes.getNamedItem("track").value;
            song.title = allSongs[i].attributes.getNamedItem("title").value;
            song.path = allSongs[i].attributes.getNamedItem("path").value;
                
            //console.log("Loaded song: " + song.path);

            // Add to all songs list
            this.songs.push(song);

            //var listItem = document.createElement("li");
            //listItem.innerHTML = "<div onclick=\"playlist.addToPlaylist(playlist.currentFolderNode.childNodes[" + i + "])\"><img src=\"controls/music.png\"/> " + folderNode.childNodes[i].getAttribute("name") + "</div>";
            //thelist.appendChild(listItem);
        }

        // sort all of the songs into alphabetical order
        this.songs.sort(CompareSongs);

        for (var i = 0; i < this.songs.length; i++)
        {
            var song = this.songs[i];

            var album = this.albums[song.album];
            if (album)
            {
                //console.log("Adding song: " + song.title);

                album.songs.push(song);
            }
            else // the album doesn't exist
            {
                //console.log("Creating album: " + song.album);
                //console.log("Adding song: " + song.title);

                album = new Album();
                album.name = song.album;
                album.artist = song.artist;
                album.songs.push(song);
                this.albums[song.album] = album;
            }

            var artist = this.artists[song.artist];
            if (artist)
            {
                // Only add the album if it doesn't already exist
                if (artist.albums.indexOf(album) == -1)
                {
                    //console.log("Adding album: " + album.name);
                    artist.albums.push(album);
                }
            }
            else // the artist doesn't exist
            {
                //console.log("Creating artist: " + song.artist);
                //console.log("Adding album: " + song.album);

                artist = new Artist();
                artist.name = song.artist;
                artist.albums.push(album);
                this.artists[song.artist] = artist;

                //this.artists[song.artist] = new Array();
                //this.artists[song.artist].push(this.albums[song.album]);
            }

            var genre = this.genres[song.genre];
            if (genre)
            {
                // Only add the artist if it doesn't already exist
                if (genre.artists.indexOf(artist) == -1)
                {
                    //console.log("Adding artist: " + artist.name);
                    genre.artists.push(artist);
                }
            }
            else
            {
                //console.log("Creating genre: " + song.genre);
                //console.log("Adding artist: " + song.artist);

                genre = new Genre();
                genre.name = song.genre;
                genre.artists.push(artist);
                this.genres[song.genre] = genre;

                //this.genres[song.genre] = new Array();
                //this.genres[song.genre].push();
            }
        }

        this.ViewAllGenres(false);
        //this.ViewAllArtists(false);
        //this.ViewAllAlbums(false);
        //this.ViewAllSongs(false);
    }

    ViewAllGenres(pushState: boolean) 
    {
        if (pushState)
        {
            // push the state into the browser history so can navigate back to it
            // pushState(stateObject, title, url)
            history.pushState({ viewAllGenres: true }, "Unused", null);
        }

        currentFolder.innerHTML = "All Genres";

        thelist.innerHTML = "";

        for (var genreItem in this.genres)
        {
            // genreItem is just the NAME of the genre, which should be used as a key
            var listItem = this.genres[genreItem].CreateListItem();
            thelist.appendChild(listItem);
        }
    }

    ViewAllArtists(pushState: boolean)
    {
        if (pushState)
        {
            // push the state into the browser history so can navigate back to it
            // pushState(stateObject, title, url)
            history.pushState({ viewAllArtists: true }, "Unused", null);
        }

        currentFolder.innerHTML = "All Artists";

        thelist.innerHTML = "";

        for (var artistItem in this.artists)
        {
            // artistItem is just the NAME of the artist, which should be used as a key
            var listItem = this.artists[artistItem].CreateListItem();
            thelist.appendChild(listItem);
        }
    }

    ViewAllAlbums(pushState: boolean)
    {
        if (pushState)
        {
            // push the state into the browser history so can navigate back to it
            // pushState(stateObject, title, url)
            history.pushState({ viewAllAlbums: true }, "Unused", null);
        }

        currentFolder.innerHTML = "All Albums";

        thelist.innerHTML = "";

        for (var albumItem in this.albums)
        {
            // albumItem is just the NAME of the album, which should be used as a key
            var listItem = this.albums[albumItem].CreateListItem();
            thelist.appendChild(listItem);
        }
    }

    ViewAllSongs(pushState: boolean)
    {
        if (pushState)
        {
            // push the state into the browser history so can navigate back to it
            // pushState(stateObject, title, url)
            history.pushState({ viewAllSongs: true }, "Unused", null);
        }

        currentFolder.innerHTML = "All Songs";

        thelist.innerHTML = "";

        for (var songItem in this.songs)
        {
            // songItem is just the NAME of the song, which should be used as a key
            var listItem = this.songs[songItem].CreateListItem();
            thelist.appendChild(listItem);
        }
    }

    OpenGenre(genreName: string)
    {
        this.genres[genreName].Open(false);
    }

    OpenArtist(artistName: string)
    {
        this.artists[artistName].Open(false);
    }

    OpenAlbum(albumName: string)
    {
        // TODO: key the albums off of the artist name AND album name to prevent potential clashes
        this.albums[albumName].Open(false);
    }

    GetNextSong()
    {
        this.currentSongIndex++;
        if (this.currentSongIndex == this.playlist.length)
            this.currentSongIndex = 0;

        return this.playlist[this.currentSongIndex];
    }

    GetPrevSong()
    {
        this.currentSongIndex--;
        if (this.currentSongIndex < 0)
            this.currentSongIndex += this.playlist.length;

        return this.playlist[this.currentSongIndex];
    }

    // add the given song node (and all other songs at the same level) to the playlist [automatically starts playing the given song node]
    AddToPlaylist(song: Song)
    {
        // clear the playlist
        this.playlist.length = 0;

        for (var i = 0; i < thelist.children.length; i++)
        {
            //console.log(i);

            var songPath: string = thelist.children[i].attributes.getNamedItem("data-path").value;

            // if the current node is the one that was clicked, then mark it as the current song (-1 since getNextSong auto increments by 1)
            if (songPath == song.path)
            {
                this.currentSongIndex = this.playlist.length - 1;
            }

            this.playlist.push(songPath);
        }

        // automatically start playing the song that was clicked
        player.PlayNextSong();
    }

    Search(query: string, pushState: boolean)
    {
        query = query.toLowerCase();

        if (pushState)
        {
            // push the state into the browser history so can navigate back to it
            // if the current state is a search, then replace it to prevent a stack of search history
            if (history.state != null && history.state.search)
            {
                //console.log("Replacing...");
                history.replaceState({ search: query }, "Unused", null);
            }
            else
            {
                history.pushState({ search: query }, "Unused", null);
            }
        }

        currentFolder.innerHTML = "Search: " + query;

        thelist.innerHTML = "";

        // find any related genres
        for (var genreItem in this.genres)
        {
            if (genreItem.toLowerCase().indexOf(query) > -1)
            {
                thelist.appendChild(this.genres[genreItem].CreateListItem());
            }
        }

        // find any related artists
        for (var artistItem in this.artists)
        {
            if (artistItem.toLowerCase().indexOf(query) > -1)
            {
                thelist.appendChild(this.artists[artistItem].CreateListItem());
            }
        }

        // find any related albums
        for (var albumItem in this.albums)
        {
            if (albumItem.toLowerCase().indexOf(query) > -1)
            {
                thelist.appendChild(this.albums[albumItem].CreateListItem());
            }
        }

        // find any related songs
        for (var songItem in this.songs)
        {
            var song = this.songs[songItem];
            if (song.title.toLowerCase().indexOf(query) > -1)
            {
                thelist.appendChild(song.CreateListItem());
            }
        }
    }
} 

/**
 * Compares two Song objects to sort them.
 */
function CompareSongs(a: Song, b: Song)
{
    // first compare the genre
    //if (a.genre < b.genre)
    //    return -1;
    //if (a.genre > b.genre)
    //    return 1;

    // genre must be the same
    // so now compare the artist
    if (a.artist < b.artist)
        return -1;
    if (a.artist > b.artist)
        return 1;

    // artist must be the same
    // so now compare the album
    if (a.album < b.album)
        return -1;
    if (a.album > b.album)
        return 1;

    // album name must be the same
    // so now compare the track
    if (a.track < b.track)
        return -1;
    if (a.track > b.track)
        return 1;

    // track name must be the same
    // so now compare the title
    if (a.title < b.title)
        return -1;
    if (a.title > b.title)
        return 1;

    // they must be the same song
    return 0;
}