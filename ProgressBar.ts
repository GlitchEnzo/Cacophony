/**
 * Represents a progress bar that displays the current time and total time of the current song.
 * @class Represents a ProgressBar
 */
class ProgressBar
{
    // Example:
    //<div onmousedown="progressClicked(event)" id="progressWrapper" style="width: 320px; position: relative; border: 1px solid black;"> 
    //     <div id="progressBar" style="width: 0%; background-color: #33cc33; position: absolute; top: 0; left: 0; height: 100%;"></div>
    //     <div id="progressText" style="width: 320px; text-align: center; position: relative;">
    //          <b id="progressTime">0:00 / 0:00</b>
    //     </div> 
    //</div>

    durationSeconds: number = 0;
    durationString: string = "0:00";
    currentTime: number = 0;
    currentTimeString: string = "0:00";
    width: number = null;

    progressWrapper: HTMLDivElement = null;
    progressBarElement: HTMLDivElement = null;
    progressTimeElement: HTMLDivElement = null;
    progressSlider: HTMLDivElement = null;

    CreateChild(width, parentElement)
    {
        this.width = width;

        this.progressWrapper = document.createElement("div");

        var thisProgressBar = this;
        //progressWrapper.addEventListener("onmousedown", function(e) { thisProgressBar.clicked(e); }, false);
        this.progressWrapper.onmousedown = function (e) { thisProgressBar.Clicked(e); };

        this.progressWrapper.style.width = width + "px";
        //this.progressWrapper.style.width = "95%";
        this.progressWrapper.style.border = "1px solid black";
        this.progressWrapper.style.borderRadius = "15px";
        this.progressWrapper.style.height = "20px";
        this.progressWrapper.style.margin = "0px auto";
        this.progressWrapper.style.backgroundColor = "#aaaaaa";
        this.progressWrapper.style.overflow = "hidden";

        this.progressBarElement = document.createElement("div");
        this.progressBarElement.style.width = "0%";
        //this.progressBarElement.style.backgroundColor = "#33cc33"; 
        this.progressBarElement.style.backgroundColor = "#00bbff";
        this.progressBarElement.style.borderRadius = "15px";
        this.progressBarElement.style.height = "100%";

        this.progressTimeElement = document.createElement("div");
        this.progressTimeElement.innerText = "0:00 / 0:00";
        this.progressTimeElement.style.width = width + "px";
        this.progressTimeElement.style.textAlign = "center";
        this.progressTimeElement.style.position = "relative";
        this.progressTimeElement.style.top = "-18px";
        this.progressTimeElement.style.fontWeight = "bolder";

        this.progressSlider = document.createElement("div");
        this.progressSlider.innerText = "slider";
        this.progressSlider.style.height = "24px";
        this.progressSlider.style.width = "24px";
        this.progressSlider.style.backgroundColor = "#cccccc";
        this.progressSlider.style.borderRadius = "15px";
        this.progressSlider.style.position = "relative";
        this.progressSlider.style.top = "-36px";

        this.progressWrapper.appendChild(this.progressBarElement);
        this.progressWrapper.appendChild(this.progressTimeElement);
        //this.progressWrapper.appendChild(this.progressSlider);

        parentElement.appendChild(this.progressWrapper);
        //parentElement.appendChild(this.progressSlider);
    }

    SetWidth(width: number)
    {
        this.width = width;
        this.progressWrapper.style.width = width + "px";
        this.progressTimeElement.style.width = width + "px";
    }

    Clicked(e: MouseEvent)
    {
        //console.log(e);
        var percentage = e.offsetX / this.width;
        this.progressBarElement.style.width = percentage * 100 + "%";

        //audioElement.currentTime = audioElement.durationSeconds * percentage;
    }

    SetDuration(durationSeconds: number)
    {
        this.durationSeconds = durationSeconds;
        this.durationString = this.ConvertSecondsToTime(durationSeconds);
        this.progressTimeElement.innerText = this.currentTimeString + " / " + this.durationString;
        this.progressBarElement.style.width = this.currentTime / this.durationSeconds * 100 + "%";
    }

    SetCurrentTime(currentSeconds: number)
    {
        this.currentTime = currentSeconds;
        this.currentTimeString = this.ConvertSecondsToTime(currentSeconds);
        this.progressTimeElement.innerText = this.currentTimeString + " / " + this.durationString;
        this.progressBarElement.style.width = this.currentTime / this.durationSeconds * 100 + "%";
    }

    /**
     * Creates a string representation of a time duration from a given number of seconds.
     * For example: 121 passed in will return "2:01"
     * @param {int} seconds The number of seconds representing the time.
     * @returns string} The stringified time, in the format "#:##".
     */
    ConvertSecondsToTime(seconds: number)
    {
        var secondsPart: string = Math.floor(seconds % 60).toString();
        if (Math.floor(seconds % 60) < 10)
            secondsPart = "0" + secondsPart;

        var minutesPart = Math.floor(seconds / 60);

        //TODO: Display hours?

        return minutesPart + ":" + secondsPart;
    }
} 