# sei-project-one tetris

Drag the folder into the overall project folder before starting the game.

asset link:
https://drive.google.com/open?id=1XKaw-6cVL3FneaY3AzG-USC65x4m7DjC

This is my first project in General Assembly written with HTML and Javascript.

I was apprehensive at first to take tetris as it was supposedly one of the most difficult in terms of technicality. However, I am very glad I did now.

This was completed with no hard copying of code, a lil working grease, and a can-do attitude. I must admit that I did do some research into other iterations of tertis and what kind of logic they used. Some of the research may have been to my detriment as at first I tried using <canvas></canvas> but after a day of managing to get a grid, I realised my lack of knowledge with it hindered any further progress so I started again with a div grid.


<!-- Grid system -->
The grid is consisted of 20 arrays (y-axis), each with an array of 10 (x-axis). This makes it a 20 x 10 of 200 cells, each with their own datasets of positions.

The grid is made with a nested for loop pushing and appending into the grid.


<!-- Tetrominos -->
The tetrominos are first made by getting a random shape of the 7, then pushing each starting position for every individual square into an array, this array represents the current shape as a whole.



<!-- Rotation -->
The tetrominos rotate based on each squares' current position. Using a forEach to relocate each and every singular block to where they are supposed to be in relation to the rotation and shape.


<!-- Line Clearing -->


possible future additions:


Credits:

Starter Code: Jack May - General Assembly

Vidoes: musicvid.org
Music:  Back to besaid - Dj Cutman
        Do you wanna do nothing with me? - Lawrence
        Say you won't - Brasstracks
        Automatic - Wave Racer
