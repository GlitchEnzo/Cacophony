﻿class Genre
{
    /*
     * The name of this genre.
     */
    name: string = "Unknown";

    /*
     * The list of artists associated with this genre.
     */
    artists: Artist[] = new Array();

    CreateListItem()
    {
        var listItem = document.createElement("li");

        listItem.innerHTML = "<div><img src=\"icons/genre.png\"/> " + this.name + " (" + this.artists.length + " artists)</div>";

        var onclick = function () { this.Open(true); };

        // we must bind the click method to this Genre object in order to make the "this" object in the handler point to this Genre object
        listItem.onclick = onclick.bind(this);

        return listItem;
    }

    Open(pushState: boolean)
    {
        if (pushState)
        {
            // push the state into the browser history so can navigate back to it
            // pushState(stateObject, title, url)
            history.pushState({ genre: this.name }, "", null);
        }
        currentFolder.innerHTML = this.name;

        thelist.innerHTML = "";
        //myScroll.refresh();

        for (var i = 0; i < this.artists.length; i++)
        {
            var artist = this.artists[i];
            var listItem = artist.CreateListItem();
            thelist.appendChild(listItem);
        }
    }
}