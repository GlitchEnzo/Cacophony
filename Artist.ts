class Artist
{
    /*
    * The name of this artist.
    */
   name: string = "Unknown";

    /*
     * The list of albums associated with this artist.
     */
    albums: Album[] = new Array();

    CreateListItem()
    {
        var listItem = document.createElement("li");

        listItem.innerHTML = "<div><img src=\"icons/artist.png\"/> " + this.name + " (" + this.albums.length + " albums)</div>";

        var onclick = function () { this.Open(true); };

        // we must bind the click method to this Artist object in order to make the "this" object in the handler point to this Artist object
        listItem.onclick = onclick.bind(this);

        return listItem;
    }

    Open(pushState: boolean)
    {
        if (pushState)
        {
            // push the state into the browser history so can navigate back to it
            // pushState(stateObject, title, url)
            history.pushState({ artist: this.name }, "Unused", null);
        }
        currentFolder.innerHTML = this.name;

        thelist.innerHTML = "";

        for (var i = 0; i < this.albums.length; i++)
        {
            var album = this.albums[i];
            var listItem = album.CreateListItem();
            thelist.appendChild(listItem);
        }
    }
}