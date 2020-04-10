function init() {
  // DOM elements
  const grid = document.querySelector('.grid')
  const tetDom = document.querySelector('.occupied')

  // grid variables
  const width = 10
  const height = 20
  const cells = []
  for (let i = 0; i < height; i++) {
    cells.push([])
  }

  // game variables
  let tetrominoPos = []
  let state = 0

  function createGrid() {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const cell = document.createElement('div')
        cell.dataset.row = row
        cell.dataset.col = col
        cell.value = 0
        grid.appendChild(cell)
        cells[row].push(cell)

        // console.log(cells[row])

        cell.dataset.row < 4 ? cell.classList.add('hidden-grid') : null
      }
    }
  }

  createGrid()

  // create tetrominos

  const shapes =
  [[{
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
      ],[
        [-1, 1],
        [0, 0],
        [1, 1],
        [2, 0]
      ],[
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
      ],[
        [-2, -1],
        [-1, 0],
        [0, 1],
        [1, 2]
      ],[
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
      ],[
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ],[
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
  }]]
  
  function getRandomLetter() {
    const num = Math.floor((Math.random() * 7))
    return shapes[num]
  }

  // function changeColor(place, color) {
  //   cells[place].style.backgroundColor = color
  // }

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

  // removes old class in old position
  function removeAll() {
    tetrominoPos.forEach(pos => removeClass(pos))
  }

  // places tet in new position
  function replaceAll() {
    tetrominoPos.forEach(pos => addClass(pos))
  }

  function createTetrominos() {
    const tet = getRandomLetter()
    tetrominoPos = []
    
    tet[0].starting.forEach(place => {
      // console.log(place) returns [3,4]
      tetrominoPos.push(place)
      addClass(place)
    })
    // tetDom.style.backgroundColor = tet[0].color
    drop()
  }

  // drop function
  function drop() {
    const dropId = setInterval(() => {
      // console.log(tetrominoPos) returns 4 arrays
      if (tetrominoPos.every(val => val.row < height - 1)) {
        //remove
        removeAll()
        //change
        tetrominoPos.forEach(pos => pos.row++)
        //replace
        replaceAll()
      } else {
        tetrominoPos.forEach(pos => {
          lockClass(pos)
        })
        state = 0
        createTetrominos()
        clearInterval(dropId)
        return
      }
    }, 300)
  }


  // Line break


  // search each array rows for all locked
  // if true, target that row
  // turn line to vacant
  // drop all locked squares above down one line


  // function lineBreak() {
  //   cells.forEach(row => {
  //     row.find(sq => sq.classList.contains('occupied'))
  //   })
  // }

  // Key movement
  function handleKeyUp(event) {


    switch (event.keyCode) {
      // right
      case 39:
        // unrespond state
        if (!tetrominoPos.every(val => val.col < 9)) {
          return
        } else {
          //remove
          removeAll()
          //change
          tetrominoPos.forEach(pos => pos.col++)
          //replace
          replaceAll()
        }
        break
        // left
      case 37:
        if (!tetrominoPos.every(val => val.col > 0)) {
          return
        } else {
          removeAll()
          tetrominoPos.forEach(pos => pos.col--)
          replaceAll()
        }
        break
        // up/rotate
      case 38:
        removeAll()
        if (!tetrominoPos.every(val => val.row < height - 1)) {
          for (let i = 0; i <= 3; i++) {
            // console.log(jTet.rotate[state]) gives 4 arrays, each with 4 arrays nested within them
            tetrominoPos[i].row += sTet.rotate[state][i][0]
            sTet.rotate[state][i][1]
            tetrominoPos[i].col += sTet.rotate[state][i][1]
          }
          replaceAll()

          state < 3 ? state++ : state = 0

          tetrominoPos.forEach(pos => {
            lockClass(pos)
          })
        } else {
          for (let i = 0; i <= 3; i++) {
            tetrominoPos[i].row += sTet.rotate[state][i][0]
            sTet.rotate[state][i][1]
            tetrominoPos[i].col += sTet.rotate[state][i][1]
          }
          replaceAll()
          state < 3 ? state++ : state = 0
        }
        break
        // down
      case 40:
        if (!tetrominoPos.every(val => val.row < height - 1)) {
          return
        } else {
          removeAll()
          tetrominoPos.forEach(pos => pos.row++)
          replaceAll()
        }
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