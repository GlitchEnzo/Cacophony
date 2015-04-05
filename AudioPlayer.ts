/**
 * A simple wrapper around the HTML5 audio element.  It handles Play, Pause, updating the progress bar, handling when a song ends, etc.
 * @class Represents a Player
 */
class AudioPlayer
{
    audioElement: HTMLAudioElement;

    constructor()
    {
        this.audioElement = document.createElement("audio");
        document.body.appendChild(this.audioElement);

        var thisPlayer = this;
        this.audioElement.addEventListener("loadeddata", function () { thisPlayer.Play(); }, true);
        this.audioElement.addEventListener("ended", function () { thisPlayer.SongEnded(); }, true);
        this.audioElement.addEventListener("timeupdate", function () { thisPlayer.CurrentTimeChanged(); }, true);
        this.audioElement.addEventListener("durationchange", function () { thisPlayer.DurationChanged(); }, true);
    }

    /**
     * Plays the song at the given song path.
     * @param {string} songPath The path of the song to play.
     */
    PlaySong(songPath: string) 
    {
        this.audioElement.src = songPath;
        this.audioElement.load();
    }

    /**
     * Plays the next song in the playlist.
     */
    PlayNextSong()
    {
        var songPath = playlist.GetNextSong();
        var parts = songPath.split("/");
        songTitle.innerHTML = parts[parts.length - 1];
        player.PlaySong(songPath);

        //playButton.src = "controls/pause.png";
    }

    /**
     * Plays the previous song in the playlist.
     */
    PlayPreviousSong()
    {
        var songPath = playlist.GetPrevSong();
        var parts = songPath.split("/");
        songTitle.innerHTML = parts[parts.length - 1];
        player.PlaySong(songPath);

        //playButton.src = "controls/pause.png";
    }

    SongEnded() 
    {
        this.PlayNextSong();

        progressBar.value = "0";
        //progressBar.max = 0;
    }

    ProgressBarChanged() 
    {
        this.audioElement.currentTime = +progressBar.value;
    }

    CurrentTimeChanged() 
    {
        progressBar.value = this.audioElement.currentTime.toString();
    }

    DurationChanged() 
    {
        progressBar.max = this.audioElement.duration.toString();
    }

    Play() 
    {
        this.audioElement.play();
    }

    Pause() 
    {
        if (this.audioElement.paused)
        {
            this.audioElement.play();
        }
        else
        {
            this.audioElement.pause();
        }
    }
} 