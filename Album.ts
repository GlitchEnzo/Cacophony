/**
 * Represents an Album for an artist that holds a list of songs.
 * @class Represents an Album
 */
class Album
{
    /*
    * The name of this album.
    */
    name: string = "Unknown";

    /*
    * The name of the artist who made this album.
    */
    artist: string = "Unknown";

    /*
    * The list of songs associated with this album.
    */
    songs: Song[] = [];

    CreateListItem() 
    {
        var listItem = document.createElement("li");

        listItem.innerHTML = "<div><img src=\"icons/album.png\"/> " + this.name + " [" + this.artist + "] (" + this.songs.length + " songs)</div>";

        var onclick = function () { this.Open(true); };

        // we must bind the click method to this Album object in order to make the "this" object in the handler point to this Album object
        listItem.onclick = onclick.bind(this);

        return listItem;
    }


    Open(pushState: boolean)
    {
        if (pushState)
        {
            // push the state into the browser history so can navigate back to it
            // pushState(stateObject, title, url)
            history.pushState({ album: this.name }, "Unused", null);
        }
        currentFolder.innerHTML = this.name;

        thelist.innerHTML = "";

        for (var i = 0; i < this.songs.length; i++)
        {
            var song = this.songs[i];
            var listItem = song.CreateListItem();
            thelist.appendChild(listItem);
        }
    }
} 