# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) General Assembly Project #1: Tetris
      
Drag the folder into the overall project folder before starting the game.

asset link:
https://drive.google.com/open?id=1XKaw-6cVL3FneaY3AzG-USC65x4m7DjC

To change the game song uncomment the current video in the index.html,
then uncomment one of the other videos.

The first project is to **a grid based game** using **HTML/CSS and vanilla Javascript**.

### Technical Requirements

Brief:

* Time given - 8 days.
* Written in HTML/CSS and vanilla Javascript.
* Create a div grid-based game.
* Display a game in the browser.
* Design logic for win and lose state.

---

## Concept

I was apprehensive at first to take tetris as it was supposedly one of the most difficult in terms of technicality. However, I am very glad I did now. I chose tetris and based the asthetic design on the recently released 'Tetris effect', using background music, visuals and effects to elevate actions as well as give it a real videogame like feel.

## Technologies Used

* HTML
* CSS
* JavaScript

---

## Walk-Through

### Home menu

[![Menu video link](https://media.giphy.com/media/fwWG9845x1Slk0i8DZ/giphy.gif)](https://youtu.be/zFiI0tc0x50)

### Line clearing and 2 player attack

[![2 Player line clearing video link](https://media.giphy.com/media/LSv9iQ3LzZwZmIwoPL/giphy.gif)](https://youtu.be/1xcTOMM-7GU)

### Game over

[![Game over video link](https://media.giphy.com/media/LSv9iQ3LzZwZmIwoPL/giphy.gif)](https://youtu.be/1NtJxeO-OPA)

## Process

### Grid System

The grid is consisted of 20 arrays (y-axis), each with an array of 10 (x-axis). This makes it a 20 x 10 of 200 cells, each with their own datasets of positions.

The grid is made with a nested for loop pushing and appending into the grid.

```
function createGrid() {
      for (let row = 0; row < height; row++) {
        cells.push([])
        for (let col = 0; col < width; col++) {
          const cell = document.createElement('div')
          cell.dataset.row = row
          cell.dataset.col = col
          grid.appendChild(cell)
          cells[row].push(cell)
          // console.log(cells) gives 10 arrays(rows) each with 10 items (cols)
          cell.dataset.row < 4 ? cell.classList.add('hidden-grid') : null
        }
      }
    }
```

### Tetrominos

The tetrominos are first made by getting a random shape of the 7, then pushing each starting position for every individual square into an array, this array represents the current shape as a whole.

```
    function createTetrominos() {
      tet = JSON.parse(JSON.stringify(shapes[incomingShape]))
      generateColor()
      getRandomLetter()
      tetrominoPos = []
      tet[0].starting.forEach(place => {
      // console.log(place) returns [3,4]
        tetrominoPos.push(place)
        addClass(place)
      })
      drop()
      lineCheck()
    }
```

### Shape example

```
      [{
        letter: 'S',
        starting: [{
          row: 2,
          col: 5
        }, {
          row: 2,
          col: 4
        }, {
          row: 3,
          col: 4
        }, {
          row: 3,
          col: 3
        }],
        color: 'yellow',
        rotate: [
          [
            [1, -1],
            [0, 0],
            [-1, -1],
            [-2, 0]
          ],
          [
            [-1, -1],
            [0, 0],
            [-1, 1],
            [0, 2]
          ],
          [
            [-1, 1],
            [0, 0],
            [1, 1],
            [2, 0]
          ],
          [
            [1, 1],
            [0, 0],
            [1, -1],
            [0, -2]
          ]
        ]
      }],
```
<!-- Movement -->
## Movement

In general most the movement works in three steps:

**Remove:** Makes the tetromino invisible.

**Change:** Moves the coordinates of the tetromino and checks if it is a viable placement.

**Replace:** The tetrominos reappear in their new cooridinates.

Each shape's coordinates are changed individually. Checks are put in place for collision of each square, subsequently moving the shape as a whole if conditions are met.  

### Wall detection

For left and right movement I had to make checks for each tetromeno square the walls. If they were out of the valid range, it would move the blocks back to thier original position making it seem as if nothing happened.


```
    function rightWallCollisionDectect() {
        while (tetrominoPos.some(val => val.col > 9) && tetrominoPos.some(val => val.col > 8)) {
          tetrominoPos.map(pos => pos.col--)
        }
      }
```

```
// right
        case keys[2]:
        // unrespond state
          removeAll()
          tetrominoPos.map(pos => pos.col++)
          rightWallCollisionDectect()
          // block check
          if (tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
            tetrominoPos.map(pos => pos.col--)
          }
          replaceAll()
          break
```

### Rotation

The tetrominos rotate based on each squares' current position. Using a for loop to relocate each and every singular block to where they are supposed to be in relation to the rotation and shape.

```
function rotate() {
        for (let i = 0; i <= 3; i++) {
        // console.log(jTet.rotate[state]) gives 4 arrays, each with 4 arrays nested within them
          tetrominoPos[i].row += tet[0].rotate[state][i][0]
          tetrominoPos[i].col += tet[0].rotate[state][i][1]
          tet[0].rotate[state][i][1]
        }
      }
```

```
// up/rotate
case keys[1]:
          removeAll()

          // base wall
          rotate()
          while (tetrominoPos.some(val => val.row > height - 1)) {
            tetrominoPos.map(pos => pos.row--)
          }
          rightWallCollisionDectect()
          leftWallCollisionDetect()  

          // block check
          while (tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
            tetrominoPos.map(pos => pos.row--)
          }
        
          replaceAll()
          state < 3 ? state++ : state = 0
          break
```

### Falling and collision detection

Falling is initiated the moment a tetormino is created. The speed is slow at first, increasing with every 3 line clearing. The drop constantly checks whether there is a frozen block or the base of the grid underneath. Wthe that happens, it checks for line clearing and creates a new tetromino at the top. As well as that it also checks if there are any frozen blocks past a certain height on the grid, setting the lose state.

```
function drop() {
      dropId = setInterval(() => {
      // console.log(tetrominoPos) returns 4 arrays
      //remove
        removeAll()
        //change
        tetrominoPos.map(pos => pos.row++)

        if (!tetrominoPos.every(val => val.row < height) || tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
          tetrominoPos.map(pos => pos.row--)
          blockLanded()
        } else {
          replaceAll()
        }
      }, speed)
    }
```

```
function blockLanded() {
      sfxLand.play()
      scoreIncrease(800 + (Math.floor(Math.random() * 300)))
      clearInterval(dropId)
      state = 0
      tetrominoPos.map(pos => {
        cells[pos.row][pos.col].classList.add('land')
        cells[pos.row][pos.col].classList.remove(currentColor)
        lockClass(pos)
      })
      // generateColor()
      lineStrike()
      !(tetrominoPos.some(sq => sq.row < 4)) ? createTetrominos() : gameOver()
    }
```

### Instant dropping

Instant dropping works like regular drops, but it keeps moving the tetromino down until one square hits a frozen block or the base of the grid.

```
// drop
        case keys[4]:
        // unrespond state
          removeAll()
          while (tetrominoPos.every(val => val.row < height) && !tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
            tetrominoPos.map(pos => pos.row++)
          }
          tetrominoPos.map(pos => pos.row -= 1)
          // because sometimes it still goes over
          if (!tetrominoPos.every(val => val.row < height)) {
            tetrominoPos.map(pos => pos.row -= 1)
          }
          replaceAll()
          blockLanded()
          break
```

### Line clearing

Line clearing is called every time a new tetromino is create. It searches all the locked tetrominos and cross-references their coordinates to see if a 10 in the same row exist. If this is true, an animation is triggered, the line is removed and all the frozen squares above it on the grid are dropped down 1 collumn.

```
function lineCheck() {
      cells.forEach((row, index) => {
        !row.every(sq => sq.classList.contains('locked')) ? null : lineBreak(index)
      })
    }

    function lineBreak(index) {
    // console.log(index)gives one number eg 19 at base
      score.textContent = Number(score.textContent) + 10000
      sfxDrop.play()
      // find all locked squares
      cells[index].map(sq =>  {
        sq.classList.add('cleared')
        setTimeout(function() {
          sq.classList.remove('cleared')
          clearClass(sq)
        }, 1100)

      })
      level++
      levelUp()
      setTimeout(function() {
        lineDrop(index)
      }, 1200)
      g === '.grid' ? meteors = 1 : meteors = 2
    }
    
    function lineDrop(brokenLine) {
      // identify all locked squares
      let allLocked 
      g === '.grid' ? allLocked = document.querySelectorAll('.grid .locked') : allLocked = document.querySelectorAll('.grid2 .locked')
      // console.log(allLocked) gives array of the different squares with the class
      const lockedRows = []
      const lockedCols = []
      allLocked.forEach(sq => {
        if (parseInt(sq.dataset.row) < brokenLine) {
          lockedRows.push(JSON.parse(JSON.stringify(parseInt(sq.dataset.row))))
          lockedCols.push(JSON.parse(JSON.stringify(parseInt(sq.dataset.col))))
        } else {
          return
        }
      })
    
      // remove change and replace locked squares
      setTimeout(function() {
        for (let i = lockedRows.length - 1; i >= 0; i--) {
          cells[lockedRows[i]][lockedCols[i]].classList.remove('locked', 'occupied')
          cells[lockedRows[i] + 1][lockedCols[i]].classList.add('locked', 'occupied')
        }
      }, 400)
    }
```

### 2 Player

2 player works very simply, at the stage selection the user picks either 1 or 2 player, setting a variable. When the game starts it checks that variable and initiates either a single game grid, or 2 game grids and styles them to fit on the screen. They work separately, but share some variables such as when one line is cleared, the other player gets 5 random squares dropped into their grid.

```
function stageSelect(event) {
    players = event.target.value
    currentPage = 'stage select'
    onePlayerBtn.classList.add('fade-left1', 'disabled')
    twoPlayerBtn.classList.add('fade-left2', 'disabled')
    optionBtn.classList.add('fade-left3', 'disabled')

    setTimeout(() => {
      stageSelectIntro()
      onePlayerBtn.classList.remove('fade-left1')
      twoPlayerBtn.classList.remove('fade-left2')
      optionBtn.classList.remove('fade-left3')
      menuScreen.style.display = 'none'
      stageMenu.style.display = 'flex'
      backIntro()
    }, 900)
  }
```

Adding additional squares to other player.

```
function lineStrike() {
      if (players === 2) {
        if (g === '.grid' && meteors === 2) {
          const strikeTeam2 = []
          for (let i = 0; i < 6; i++) {
            strikeTeam2.push(Math.floor(Math.random() * 9))
          } 
          meteors = 0
          meteor(strikeTeam2)
        } 
        if (g === '.grid2' && meteors === 1) {
          const strikeTeam1 = []
          for (let i = 0; i < 6; i++) {
            strikeTeam1.push(Math.floor(Math.random() * 9))
          } 
          meteors = 0
          meteor(strikeTeam1)
        }
      }
    }

    function meteor(coordinates) {
      for (let i = 0; i < coordinates.length - 1; i++) {
        let newBoyRow = 4
        const newBoyCol = coordinates[i]
        while (newBoyRow < height && !cells[newBoyRow][newBoyCol].classList.contains('locked')) {
          newBoyRow++
        }
        // because sometimes it still goes over
        if (!newBoyRow < height || cells[newBoyRow][newBoyCol].classList.contains('locked')) {
          newBoyRow--
        }
        cells[newBoyRow][newBoyCol].classList.add('land', 'locked')
        console.log(cells[newBoyRow][newBoyCol])
      }
      sfxCrash.play()
      if (g === '.grid') {
        player1Screen.classList.add('crash')
        setTimeout(() => {
          player1Screen.classList.remove('crash')
        }, 1300)
      } else {
        player2Screen.classList.add('crash')
        setTimeout(() => {
          player2Screen.classList.remove('crash')
        }, 1300)
      }
    }

```


---

## Wins and Blockers

Implimenting 2 player functionality was a big hurdle for me, I initially created another function which repeated a lot of my previously created code but proved tedious and crashed the game. After some time I figured out a simpler way by adding a variable that states whether it is 1 or 2 player and initiating the game functionality separately.

Another challenge was with the tetominos themselves. We had not covered object relational data yet, so for a long time I could only display one of each tetromino type on the game until it stopped all progress. After thorough research I learned this the hard way, and fixed it through the use of `JSON.parse` and `JSON.stringify`.

There were a lot of wins with this project, I am particularly happy with the design and asthetics of the game. I started this project with a very ambitious mental image of what I wanted and I am very satisfied with how it turned out. The animations work very well to elevate the game, especially the line breaks.

---

## Bugs

* Song choices shows three possibilities but plays the same song.
* No audio on the main menu page until the window is clicked.
* Background video stops after finished but game continues.
* Back button animation glitches.

---

## Future Features

* Win and lose state for 2 player
* Play again functionality
* Go back to menu option
* ambient menu soundtrack

---

## Key Lessons Learnt

I learned a lot from this project, mainly with how functions work and communicate with one another. The implimentation of 2 player taught me how to reuse code and concurrently run 2 functions at the same time. This was also very good practice with conditionals using while loops for the collision detection, making them concise was key. As well as that I became a lot more comfortable with CSS animations in creating the menu and line clearing which I am very proud of. This project really solidified my understanding of vanilla JavaScript, HTML, and CSS.
