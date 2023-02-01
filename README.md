# Chrome-Extension-Timer
Project to create a chrome extension with a timer that runs out
Timer is chrome extension which closes a tab automatically after a certain length of time.

There are 4 main files that make up Timer. The manifest.json file is necessary for all chrome extensions, storing data like the name of the extension, the version number, the description and the permissions. 
The popup.html file is for the pop-up displayed when the icon is clicked. The popup.css file styles the popup, and the popup.js file controls the behaviour of the popup. 
There are also some PNG files that are used for icons.

Popup.html contains 3 divs. The first is the "form" div, which contains a flex row of input fields and a start button. The input fields correspond to hours, minutes and seconds and are labelled as such. 
The "timer" div is initially not displayed, and it contains an empty paragraph tag, as well as an SVG element contained two rectangles of equal width and height. The green rectangle is displayed on the top of the grey rectangle. 
The "hidden" div contains the "show" and "hide" buttons, which are also not displayed initially.

I will now explain how the popup.js file controls behaviour of the popup. The user inputs their desired duration into the fields of the form div and then clicks the "start" button. 
When the "start" button is clicked, the event listener added to the "start" button in the popup.js file calls an anonymous function. This function hides the "form" div and displays the "timer" div. 
It converts the duration inputted by the user to milliseconds, which is stored in the "Duration" variable, and then displays in an HH:MM:SS format in the paragraph tag of the "timer" div. A separate function, formatTime is called to format the time. 
The function then calls the setInterval method, which calls another anonymous function every 1000 milliseconds. 
This function in turn decrements the duration, updates the time displayed on the timer. It also shrinks the width of the green rectangle by a value proportional to the 1000 milliseconds that have passed. 
This value is calculated using the user's input and stored in the "ShrinkBar" variable when the "start" button is clicked.

When the time has run out, the duration is 0. At this point, the clearInterval method is called by an if statement, which stops the startInterval method from calling the function. 
Two chrome specific methods -- chrome.tabs.query and chrome.tabs.remove are called to get the id of the tab, and close the tab.

The "hide" button is also displayed when the start button is clicked. 
When the "hide" button is clicked, the event listener added to it calls a function which hides the "timer" div, the heading, the "hide" button and displays the "show" button. 
When the "show" button is clicked, it reverses the effects of the hide button. This allows the user to toggle between have the timer displayed and not showing it, regardless of which, the tab will be closed when the time is up.

I considered using the moment.js library as an alternative to the setInterval method. However, upon testing I felt that the setInterval method was better suited to my purposes.

