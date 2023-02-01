document.addEventListener("DOMContentLoaded", function(){

    // declaring variable to store id of setInterval function
    let start;

    // if start button is pressed, begin the timer
    let StartButton = document.querySelector("#start");
    StartButton.addEventListener("click", function(){

        // change the heading
        document.querySelector("h1").innerHTML = "Never a minute to spare!";

        // variables to store the users inputted hours, minutes and seconds
        var hours = document.querySelector("#hours").value;
        var minutes = document.querySelector("#minutes").value;
        var seconds = document.querySelector("#seconds").value;

        // round these off to the nearest integer
        hours = Math.round(hours);
        minutes = Math.round(minutes);
        seconds = Math.round(seconds);

        // find the total duration in milliseconds
        Duration = hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000;

        // format the time into HH:MM:SS
        hours = formatTime(hours);
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);

        // display the start time
        document.querySelector("#timer p").innerHTML = hours + ":" + minutes + ":" + seconds;

        document.querySelector("#form").style.display = "none";

        document.querySelector("#timer").style.display = "block";

        // the amount to shrink the bar width by each second
        ShrinkBar = ((16 / Duration) * 1000);

        // display the hide button
        document.querySelector("#hide").style.display = "block";

        var hide =  document.querySelector("#hide");

        // add an event listener to the hide button to hide everything when clicked
        hide.addEventListener("click", function(){

            // hide everything but show the "show" button
            document.querySelector("h1").style.display = "none";
            document.querySelector("#timer").style.display = "none";
            document.querySelector("#show").style.display = "block";
            document.querySelector("#hide").style.display = "none";

            // when the show button is clicked, reverse all the effects of clicking the hide button
            var show = document.querySelector("#show");

            show.addEventListener("click", function(){

                document.querySelector("#timer").style.display = "block";
                document.querySelector("#show").style.display = "none";
                document.querySelector("#hide").style.display = "block";
                document.querySelector("h1").style.display = "block";
            });
        });

        // use the setInterval function to call a function changing the time displayed and the width of the timer bar every second
        start = setInterval(function(){

            // the duration is decremented, then used to find new values for hours, minutes and seconds
            Duration = Duration - 1000;
            h = Math.floor((Duration / (60 * 60 * 1000)));
            m = Math.floor(((Duration % (60 * 60 * 1000)) / (60 * 1000)));
            s = ((Duration % (60 * 60 * 1000)) % (60 * 1000)) / 1000;

            // the time is formatted into HH:MM:SS
            h = formatTime(h);
            m = formatTime(m);
            s = formatTime(s);

            // the timer is updated in the html popup
            document.querySelector("#timer p").innerHTML = h + ":" + m + ":" + s;

            // the green timer bar's width is decreased by the value of the ShrinkBar element and then updated
            var x = document.getElementById("timerbar").getAttribute("width");
            var SvgWidth = (parseFloat(x) - ShrinkBar).toString() + "rem";

            // this prevents an invalid negative value for the SvgWidth
            if (parseFloat(x) - ShrinkBar < 0)
            {
                SvgWidth = 0 + "rem";
            }
            document.getElementById("timerbar").setAttribute("width", SvgWidth);

            // this clears the interval when the time is up
            if (Duration == 0)
            {
                // this is used to get the active tab id and close it
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.remove(tabs[0].id);
                });
                clearInterval(start);
            }
        }, 1000);
    }, false);
}, false);

// this is the function that adds a zero in front if time < 10
function formatTime(time){

    if (time < 10)
    {
        time = '0' + time;
    }
    return time;
}
