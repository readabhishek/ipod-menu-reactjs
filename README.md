
# iPod Menu

### Here we are trying to demonstrate the menu navigation of iPod using React JS

The UI is divided into multiple components.
1) The Container - This is the Top Most Parent which is directly being rendered by App.js
   It maintains overall App State and renders other child components based on State properties.
   
2) ***Main Menu*** - This displays the main menu

3) ***Music*** - displays Songs and Album lists - Navigate here, lots of actions to explore.

4) ***Games*** - displays games list - Just for Demo, not much action

5) ***SubMenu 3 Songs*** - This loads all the songs from a static list

6) ***SubMenu 4 Play Song*** - This UI Component plays songs as selected. 
   Use Play/Pause/Forward/Backward buttons to explore the actions.
   
7) ***Wheel Button Control*** - This displays the iPod buttons and wheel for rotation gesture. 
   This component is added with all above components, and it passes all the generated events 
   back to the calling/parent component. The calling/parent component can take appropriate
   action for those events (like GoBack, highlight menu item, select, play, pause etc)


8) ***Cover and Settings*** - Just for Demo, not much action

## Features to explore

1) ### Menu Navigation from Main Menu to Sub menu.
   ***Use rotation gesture on the wheel (Clock wise or Anti-Clock wise) from mouse pointer
   to highlight menu items.*** 
   
2) ***Use Select button to select the highlighted menu item. 
   Select button is the bottom center circle on the wheel.
   Use mouse to click it***

3) ***Go Back (from Child Menu to Parent Menu)***

4) ***Play Song*** - Navigate in the following path:  Main Menu > Music > All Songs > [select a song]

5) ***Play, Pause, Forward, Backward (while playing a song)***

6) ***Menu Button*** - To go back to main menu from anywhere

