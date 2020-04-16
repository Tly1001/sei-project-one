
function init() {
  // DOM elements
  const menu = document.querySelector('.menu-screen')
  const onePlayerBtn = document.querySelector('#one-player')
  const twoPlayerBtn = document.querySelector('#two-player')
  const optionBtn = document.querySelector('#options')
  const optionScreen = document.querySelector('.options-wrap')
  const menuScreen = document.querySelector('.button-wrap')
  const gameWrap = document.querySelector('.wrapper')
  const player2Screen = document.querySelector('.container2')
  const backBtn = document.querySelector('#back-btn')
  const video = document.querySelector('#game-vid')
  const menuBgVid = document.querySelector('.menu-backg')
  const stageMenu = document.querySelector('.stage-select')
  const previewVid = document.querySelectorAll('.vid')
  const pauseText = document.querySelector('.press-enter')
  const volume = document.querySelector('#volume')
  const sfx = document.querySelector('#sfx')

  // Menu variables
  let currentPage = 'main'
  let players
  const bgVideos = ['assets/Classic_Net_Flare .mp4']

  // Menu functions
  function intro() {
    setTimeout(() => {
      onePlayerBtn.classList.remove('loaded1')
      twoPlayerBtn.classList.remove('loaded2')
      optionBtn.classList.remove('loaded3')
    }, 1000)
  }

  function backIntro() {
    backBtn.style.display = 'list-item'
    backBtn.classList.remove('fade-out-right', 'disabled')
    backBtn.classList.add('fade-in-right')
    setTimeout(() => {
      backBtn.classList.remove('fade-in-right')
    }, 800)
  }
  
  function options() {
    currentPage = 'options'
    onePlayerBtn.classList.add('fade-left1', 'disabled')
    twoPlayerBtn.classList.add('fade-left2', 'disabled')
    optionBtn.classList.add('fade-left3', 'disabled')

    setTimeout(() => {
      onePlayerBtn.classList.remove('fade-left1')
      twoPlayerBtn.classList.remove('fade-left2')
      optionBtn.classList.remove('fade-left3')
      optionScreen.classList.remove('disabled')
      menuScreen.style.display = 'none'
      optionScreen.style.display = 'flex'
      backIntro()
    }, 900)
  }

  function goBack() {
    if (currentPage === 'options') {
      optionScreen.style.display = 'none'
      optionScreen.classList.add('disabled')
    } else if (currentPage === 'stage select') {
      stageMenu.style.display = 'none'
      stageMenu.classList.add('disabled')
    } 
    menuScreen.style.display = 'flex'
    backBtn.classList.add('fade-out-right', 'disabled')
    onePlayerBtn.classList.add('loaded1')
    twoPlayerBtn.classList.add('loaded2')
    optionBtn.classList.add('loaded3')
    intro()
    onePlayerBtn.classList.remove('disabled')
    twoPlayerBtn.classList.remove('disabled')
    optionBtn.classList.remove('disabled')
    setTimeout(() => {
      backBtn.style.display = 'none'
    }, 800)
    currentPage = 'main'
  }

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

  function setVolume() {
    video.volume = volume.value / 100
  }

  function setSFX() {
    audio.volume = volume.value / 100
  }

  intro()
  onePlayerBtn.addEventListener('click',stageSelect)
  twoPlayerBtn.addEventListener('click',stageSelect)
  optionBtn.addEventListener('click', options)
  backBtn.addEventListener('click', goBack)
  menu.addEventListener('mouseover',function () {
    menuBgVid.play()
  })
  volume.addEventListener('change', setVolume)
  sfx.addEventListener('change', setSFX)

  function stageSelectIntro() {
    stageMenu.classList.remove('disabled')
    previewVid.forEach(vid => {
      vid.addEventListener('mouseover', function(event) {
        event.target.play()
      })
      vid.addEventListener('mouseout', function(event) {
        event.target.pause()
      })
      vid.addEventListener('click', function() {
        menuBgVid.style.display = 'none'
        menu.style.display = 'none'
        stageMenu.style.display = 'none'
        backBtn.style.display = 'none'
        gameWrap.style.display = 'flex'
        video.style.display = 'inline'
        video.play()
        if (players === 1) {
          game('.grid', '.next')
        } else {
          player2Screen.style.display = 'flex'
          game('.grid', '.next')
          game('.grid2', '.next2')
        }
      })
    })
  }



  function game(g, n) {
  // DOM elements
    const grid = document.querySelector(g)
    const next = document.querySelector(n)
    const score = document.querySelector('#score')
    const score2 = document.querySelector('#score2')
    const time = document.querySelector('#time1')
    const time2 = document.querySelector('#time2')



    // grid variables
    const width = 10
    const height = 20
    const cells = []


    // game variables
    const nextShapeBox = []
    const nextShapeCoordinates = [[6,7,9,10], [1,5,9,13], [5,6,9,10], [1,5,9,10],[2,5,6,10],[4,5,9,10],[2,6,9,10]]
    let incomingShape = Math.floor((Math.random() * 7))
    let tet
    let tetrominoPos = []
    let state = 0
    let dropId
    let timeId
    let level = 0
    let speed = 1500
    let player = 0

  
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

    function createTetrominos() {
      tet = JSON.parse(JSON.stringify(shapes[incomingShape]))
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
  
    function timeCount() {
      if (g === '.grid') {
        timeId = setInterval(() => {
          time.textContent = parseInt(time.textContent) + 1
          time2.textContent = time.textContent
    
        }, 1000)
      }
    }

    function nextShapeGrid() {
      for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div')
        next.appendChild(cell)
        nextShapeBox.push(cell)
      }
    }

    function getRandomLetter() {
      const num = Math.floor((Math.random() * 7))
      generateNextShape([...nextShapeCoordinates[num]], num)
    }

    function generateNextShape(id, num) {
      const getShape = [...id]
      const allNextDivs = next.children
      for (let i = 0; i < allNextDivs.length; i++) {
        if (allNextDivs[i].classList.contains('future')) {
          allNextDivs[i].className = ('')
        }
      }
      getShape.forEach(place => nextShapeBox[place].classList.add('future'))
      incomingShape = num
    }

    function startGame() {
      createTetrominos()
      timeCount()
    }

    function gameOver() {
      clearInterval(timeId)
    }

    function scoreIncrease(num) {
      const tempScore = Number(score.textContent) + num
      const tempScore2 = Number(score2.textContent) + num
      if (g === '.grid') {
        const scoreUp = setInterval(() => {
          score.textContent = Number(score.textContent) + 10
          if (tempScore <= parseInt(score.textContent)) {
            clearInterval(scoreUp)
          }
        }, 1)
      } else {
        const scoreUp2 = setInterval(() => {
          score2.textContent = Number(score2.textContent) + 10
          if (tempScore2 <= parseInt(score2.textContent)) {
            clearInterval(scoreUp2)
          }
        }, 1)
      }
    }
  

    createGrid()
    nextShapeGrid()

    // create tetrominos

    const shapes = [
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

      [{
        letter: 'I',
        starting: [{
          row: 0,
          col: 4
        }, {
          row: 1,
          col: 4
        }, {
          row: 2,
          col: 4
        }, {
          row: 3,
          col: 4
        }],
        color: 'yellow',
        rotate: [
          [
            [1, 2],
            [0, 1],
            [-1, 0],
            [-2, -1]
          ],
          [
            [2, -2],
            [1, -1],
            [0, 0],
            [-1, 1]
          ],
          [
            [-2, -1],
            [-1, 0],
            [0, 1],
            [1, 2]
          ],
          [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
          ]
        ]
      }],

      [{
        letter: 'O',
        starting: [{
          row: 2,
          col: 4
        }, {
          row: 2,
          col: 5
        }, {
          row: 3,
          col: 4
        }, {
          row: 3,
          col: 5
        }],
        color: 'yellow',
        rotate: [
          [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
          ],
          [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
          ],
          [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
          ],
          [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
          ]
        ]
      }],

      [{
        letter: 'L',
        starting: [{
          row: 1,
          col: 4
        }, {
          row: 2,
          col: 4
        }, {
          row: 3,
          col: 4
        }, {
          row: 3,
          col: 5
        }],
        color: 'green',
        rotate: [
          [
            [1, 1],
            [0, 0],
            [-1, -1],
            [0, -2]
          ],
          [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 0]
          ],
          [
            [-1, -1],
            [0, 0],
            [1, 1],
            [0, 2]
          ],
          [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, 0]
          ]
        ]
      }],
      [{
        letter: 'T',
        starting: [{
          row: 2,
          col: 4
        }, {
          row: 2,
          col: 5
        }, {
          row: 2,
          col: 6
        }, {
          row: 3,
          col: 5
        }],
        color: 'brown',
        rotate: [
          [
            [-1, 1],
            [0, 0],
            [1, -1],
            [-1, -1]
          ],
          [
            [1, 1],
            [0, 0],
            [-1, -1],
            [-1, 1]
          ],
          [
            [1, -1],
            [0, 0],
            [-1, 1],
            [1, 1]
          ],
          [
            [-1, -1],
            [0, 0],
            [1, 1],
            [1, -1]
          ]
        ]
      }],
      [{
        letter: 'Z',
        starting: [{
          row: 2,
          col: 4
        }, {
          row: 2,
          col: 5
        }, {
          row: 3,
          col: 5
        }, {
          row: 3,
          col: 6
        }],
        color: 'red',
        rotate: [
          [
            [-1, 1],
            [0, 0],
            [-1, -1],
            [0, -2]
          ],
          [
            [1, 1],
            [0, 0],
            [-1, 1],
            [-2, 0]
          ],
          [
            [1, -1],
            [0, 0],
            [1, 1],
            [0, 2]
          ],
          [
            [-1, -1],
            [0, 0],
            [1, -1],
            [2, 0]
          ]
        ]
      }],

      [{
        letter: 'J',
        starting: [{
          row: 3,
          col: 4
        }, {
          row: 3,
          col: 5
        }, {
          row: 2,
          col: 5
        }, {
          row: 1,
          col: 5
        }],
        color: 'blue',
        rotate: [
          [
            [-2, 0],
            [-1, -1],
            [0, 0],
            [1, 1]
          ],
          [
            [0, 2],
            [-1, 1],
            [0, 0],
            [1, -1]
          ],
          [
            [2, 0],
            [1, 1],
            [0, 0],
            [-1, -1]
          ],
          [
            [0, -2],
            [1, -1],
            [0, 0],
            [-1, 1]
          ]
        ]
      }]
    ]

    // Game functions

    function addClass(pos) {
    // console.log(pos) returns row:num col:num
      cells[pos.row][pos.col].classList.add('occupied')
    }

    function removeClass(pos) {
      cells[pos.row][pos.col].classList.contains('occupied') ? cells[pos.row][pos.col].classList.remove('occupied') : null
    }

    function lockClass(pos) {
      cells[pos.row][pos.col].classList.add('locked')
    }

    function clearClass(pos) {
      pos.className = ''
    }

    function removeAll() {
      tetrominoPos.map(pos => removeClass(pos))
    }

    function replaceAll() {
      tetrominoPos.map(pos => addClass(pos))
    }
  
    function levelUp() {
      level++
      switch (level) {
        case 2:
          speed = 1200
          break
        case 4:
          speed = 900
          break
        case 6:
          speed = 700
          break
        case 8:
          speed = 600
          break
        case 10:
          speed = 400
          break
        case 12:
          speed = 300
          break
        default: null
      }
    }
  

  

    // drop function

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

    function blockLanded() {
      scoreIncrease(800 + (Math.floor(Math.random() * 300)))
      clearInterval(dropId)
      state = 0
      tetrominoPos.map(pos => lockClass(pos))
      !(tetrominoPos.some(sq => sq.row < 4)) ? createTetrominos() : gameOver()
    }

    // Line break

    function lineCheck() {
      cells.forEach((row, index) => {
        !row.every(sq => sq.classList.contains('locked')) ? null : lineBreak(index)
      })
    }

    function lineBreak(index) {
    // console.log(index)gives one number eg 19 at base
      score.textContent = Number(score.textContent) + 10000
      // find all locked squares
      cells[index].map(sq => clearClass(sq))
      level++
      levelUp()
      lineDrop(index)
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
  
    // Key movement
    function handleKeyUp(event) {
      const keyIndex = [[37, 38, 39, 40, 191], [65, 87, 68, 83, 81]]
      let keys
      g === '.grid' ? keys = keyIndex[0] : keys = keyIndex[1]

      function rotate() {
        for (let i = 0; i <= 3; i++) {
        // console.log(jTet.rotate[state]) gives 4 arrays, each with 4 arrays nested within them
          tetrominoPos[i].row += tet[0].rotate[state][i][0]
          tetrominoPos[i].col += tet[0].rotate[state][i][1]
          tet[0].rotate[state][i][1]
        }
      }

      function rightWallCollisionDectect() {
        while (tetrominoPos.some(val => val.col > 9) && tetrominoPos.some(val => val.col > 8)) {
          tetrominoPos.map(pos => pos.col--)
        }
      }

      function leftWallCollisionDetect() {
        while (tetrominoPos.some(val => val.col < 0) && tetrominoPos.some(val => val.col < 2)) {
          tetrominoPos.map(pos => pos.col++)
        }
      }
      // cant get to work
      // function blockCheck(input) {
      //   if (tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
      //     tetrominoPos.map(pos => pos.col`${input}`)
      //   }
      // }

      switch (event.keyCode) {

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
        // left
        case keys[0]:
          removeAll()
          tetrominoPos.map(pos => pos.col--)
          leftWallCollisionDetect()
          // block check
          if (tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
            tetrominoPos.map(pos => pos.col++)
          }        
          replaceAll()
          break
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
        // down
        case keys[3]:
          removeAll()
          tetrominoPos.map(pos => pos.row++)
          if (!tetrominoPos.every(val => val.row < height) || tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
            tetrominoPos.map(pos => pos.row--)
            blockLanded()
          }
          replaceAll()
          break
        // drop
        case keys[4]:
        // unrespond state
          removeAll()
          while (tetrominoPos.every(val => val.row < height) && !tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
            tetrominoPos.map(pos => pos.row++)
          }
          console.log(tetrominoPos)
          tetrominoPos.map(pos => pos.row -= 1)
          // because sometimes it still goes over
          if (!tetrominoPos.every(val => val.row < height)) {
            tetrominoPos.map(pos => pos.row -= 1)
          }
          replaceAll()
          blockLanded()
          break
        // enter, music and pause
        case 13:
          console.log('pressed')
          video.play()
          if (player === 1) {
            menu.style.display = 'none'
            optionScreen.style.display = 'none'
            gameWrap.style.display = 'flex'
            pauseText.style.display = 'none'
            video.play()
            drop()
            timeCount()
            player--
          } else {
            menu.style.display = 'block'
            optionScreen.style.display = 'flex'
            gameWrap.style.display = 'none'
            pauseText.style.display = 'flex'
            clearInterval(dropId)
            clearInterval(timeId)
            player++
          } 
          break

        default:
          console.log('invalid key')
      }
    }

    startGame()

    // Event Listeners
    document.addEventListener('keyup', handleKeyUp)
  }
}
window.addEventListener('DOMContentLoaded', init)

