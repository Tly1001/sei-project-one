function init() {
  // DOM elements
  const grid = document.querySelector('.grid')
  // const tetDom = document.querySelector('.occupied')

  // grid variables
  const width = 10
  const height = 20
  const cells = []
  for (let i = 0; i < height; i++) {
    cells.push([])
  }

  // game variables
  let tet
  let tetrominoPos = []
  let state = 0
  let dropId

  function createGrid() {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const cell = document.createElement('div')
        cell.dataset.row = row
        cell.dataset.col = col
        cell.value = 0
        grid.appendChild(cell)
        cells[row].push(cell)

        // console.log(cells) gives 10 arrays(rows) each with 10 items (cols)

        cell.dataset.row < 4 ? cell.classList.add('hidden-grid') : null
      }
    }
  }

  createGrid()
  // console.log(cells[4][3].dataset)
  // gives {row: "4", col: "3"}

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
  
  function getRandomLetter() {
    const num = Math.floor((Math.random() * 7))
    return shapes[num]
  }

  function createTetrominos() {
    //start new tet
    tet = JSON.parse(JSON.stringify(getRandomLetter()))
    //to clear of any content
    tetrominoPos = []
    tet[0].starting.forEach(place => {
      // console.log(place) returns [3,4]
      tetrominoPos.push(place)
      addClass(place)
    })


    // tetDom.style.backgroundColor = tet[0].color
    drop()
    lineCheck()
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
    }, 20000)
  }

  function blockLanded() {
    clearInterval(dropId)
    state = 0
    tetrominoPos.map(pos => lockClass(pos))
    createTetrominos()
  }

  // Line break

  function lineCheck() {
    cells.forEach((row, index) => {
      !row.every(sq => sq.classList.contains('locked')) ? null : lineBreak(index)
    })
  }

  function lineBreak(index) {
    // console.log(index)gives one number eg 19 at base

    // find all locked squares
    cells[index].map(sq => clearClass(sq))
    //   sq.classList.remove('occupied')
    //   sq.classList.remove('locked')
    // })
    lineDrop(index)
  }

  function lineDrop(brokenLine) {
    console.log(brokenLine)

    // identify all locked squares
    const allLocked = document.querySelectorAll('.locked')
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

    // remove change and replace

    setTimeout(function() {
      for (let i = 0; i < lockedCols.length; i++) {
        cells[lockedRows[i]][lockedCols[i]].classList.remove('locked')
        cells[lockedRows[i] + 1][lockedCols[i]].classList.add('locked')
      }
    }, 800)
    
    // change and replace
  }
  
  // Key movement
  function handleKeyUp(event) {

    function rotate() {
      for (let i = 0; i <= 3; i++) {
        // console.log(jTet.rotate[state]) gives 4 arrays, each with 4 arrays nested within them
        tetrominoPos[i].row += tet[0].rotate[state][i][0]
        tet[0].rotate[state][i][1]
        tetrominoPos[i].col += tet[0].rotate[state][i][1]
      }
    }

    switch (event.keyCode) {

      // right
      case 39:
        // unrespond state
        removeAll()
        tetrominoPos.map(pos => pos.col++)
        if (!tetrominoPos.every(val => val.col <= 9) || tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
          tetrominoPos.map(pos => pos.col--)
        }
        replaceAll()
        break
        // left
      case 37:
        removeAll()
        tetrominoPos.map(pos => pos.col--)
        if (!tetrominoPos.every(val => val.col >= 0) || tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
          tetrominoPos.map(pos => pos.col++)
        }
        replaceAll()
        break
        // up/rotate
      case 38:
        removeAll()
        rotate()
        if (!tetrominoPos.every(val => val.row < height - 1)) {
          rotate()
          // base wall
          if (!tetrominoPos.every(val => val.row < height - 1) || tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
            
            tetrominoPos.map(pos => pos.row -= 1)
          }
        }
          
        // right wall
        if (!tetrominoPos.every(val => val.col <= 9)) {
          if (!tetrominoPos.some(val => val.col > 10)) {
            tetrominoPos.map(pos => pos.col--)
          } else {
            tetrominoPos.map(pos => pos.col -= 2)
          }
        }

        // left wall
        if (!tetrominoPos.every(val => val.col >= 0)) {
          if (!tetrominoPos.some(val => val.col < -1)) {
            tetrominoPos.map(pos => pos.col++)
          } else {
            tetrominoPos.map(pos => pos.col += 2)
          }
        }
        
        // block check
        while (tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
          tetrominoPos.map(pos => pos.row -= 1)
          if (tetrominoPos.some(val => val.col > 9)) {
            tetrominoPos.map(pos => pos.col--)
          }
          if (tetrominoPos.some(val => val.col < 0)) {
            tetrominoPos.map(pos => pos.col++)
          }
        }
        replaceAll()
        state < 3 ? state++ : state = 0
        break
        // down
      case 40:
        removeAll()
        tetrominoPos.map(pos => pos.row++)
        if (!tetrominoPos.every(val => val.row < height) || tetrominoPos.some(val => cells[val.row][val.col].classList.contains('locked'))) {
          tetrominoPos.map(pos => pos.row--)
          blockLanded()
        }
        replaceAll()
        break
      default:
        console.log('invalid key')
    }
  }


  createTetrominos()

  // Event Listeners
  document.addEventListener('keyup', handleKeyUp)

}

window.addEventListener('DOMContentLoaded', init)