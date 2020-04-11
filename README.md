# sei-project-one
first project in General Assembly written with HTML and Javascript



current: 
trying to work stopping if square underneath is blocked

to do:
line clears but wont kick the other blocked squares down
collision detection
line clear
next block
score
timer



Bugs:

- rotate kicks up one sometimes
- pressing down at base stops new tet being created


<!-- Grid system -->

Upon research, I noticed that creating hundreds of separate divs to make a whole grid would present its own challenges in the long term, being math heavy for the tetrominos when it came to rotation.

In this case I decided to use <canvas></canvas> which allowed a whole board to be used, alongside coordinates.

I had decided already that the grid would be: 600px by 300px so a 10 x 20 grid with 30px being the length of a single block.

 const canvas = document.querySelector('#grid')
  const ctx = canvas.getContext('2d')
  const w = ctx.canvas.width
  const h = ctx.canvas.height
  const block = 30
  ctx.canvas.height = 600

function drawGrid(ctx, w, h, block) {
    const newW = w * 2
    const newH = w * 2
    ctx.strokeStyle = 'grey'
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = 0; x <= newW; x += block) {
      ctx.moveTo(x - 0.5, 0)
      ctx.lineTo(x - 0.5, newW)
      for (let y = 0; y <= newH; y += block) {
        ctx.moveTo(0, y - 0.5)
        ctx.lineTo(newH, y - 0.5)
      }
    }
    ctx.stroke()
  }

First I created a canvas tag in HTML, then linked it to the JS.
I had some issues with drawing a grid;

First it was not drawing the right amount of lines, I found out that canvas has a set 300px,150px measurement that is difficult to change. If you change the size in CSS it will increase the contents to scale for the size which was unwanted. The only way I could work around this was to try and reassign the height for ctx.canvas.height, then double the values when drawing the grid itself.

I did not change the width because the default width was already what I wanted it to be at.

Secondly I noticed the lines draw were being blurred. After scouring the wonderful world of the net I found out that a 1px line drawn by default actually falls in between two pixels, kind of like double parking. So all that needs to be done is to shift the starting incriment by 0.5px

<!-- Tetrominos -->

The creation of tetrominos follow off the <canvas></canvas> prototype.

function createTetro(x, y, color) {
    ctx.fillStyle = 'green'
    ctx.fillRect(x, y, block height, block width)
    ctx.strokeStyle = 'black'
    ctx.strokeRect(x, y, block height, block width)
  }

fillRect and fillStyle determine the block position and internal color.
strokeRect and strokeStyle determine outline of the blocks.

## Scrapped Everything previously

So I hit a wall, restarted using Jacks example from lesson, I restructured his wack 'em all game to fit a tetris format and refactored the movement to fit movement of the blocks.