function init() {
  // DOM elements
  const grid = document.querySelector('.grid')
  const cells = []

  // grid variables
  const width = 10
  const height = 24
  const cellCount = width * height

  // game variables
  let tetrominoPos = []
  let color
  let state = 0

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
      i < 40 ? cell.classList.add('hidden-grid') : null
    }

  }

  createGrid()
  // create tetrominos
  const jTet = {
    starting: [34, 35, 25, 15],
    color: 'blue',
    rotate: [
      [-20, -11, 0, 11],
      [2, -9, 0, 9]
    ],
    state: 0
  }

  function changeColor(place, color) {
    cells[place].style.backgroundColor = color
  }

  function createTetrominos(tet) {
    tet.starting.forEach(place => {
      changeColor(place, tet.color)
      tetrominoPos.push(place)
      color = tet.color
    })
    drop()
  }

  // drop function
  function drop() {
    const dropId = setInterval(() => {
      if (tetrominoPos[0] + 10 < 239) {
        tetrominoPos = tetrominoPos.map(pos => {
          changeColor(pos, 'white')
          changeColor(pos + 10, color)
          return pos + 10
        })
      } else {
        tetrominoPos.forEach(pos => {
          changeColor(pos, 'black')
          clearInterval(dropId)
        })
        return
      }
    }, 900)
  }

  createTetrominos(jTet)

  function handleKeyUp(event) {
    // removes old class in old position

    const x = tetrominoPos[0] % width
    const y = Math.floor(tetrominoPos[0] / height)

    console.log(event.keyCode)
    switch (event.keyCode) {
      // right
      case 39:
        if (x < width - 1)
          tetrominoPos = tetrominoPos.map(pos => {
            changeColor(pos, 'white')
            changeColor(pos++, color)
            return pos++
          })
        break
        // left
      case 37:
        if (x > 0)
          tetrominoPos = tetrominoPos.map(pos => {
            changeColor(pos, 'white')
            changeColor(pos--, color)
            return pos--
          })

        break
        // up
      case 38:
        if (y > 0)
          tetrominoPos = tetrominoPos.map(pos => {
            changeColor(pos, 'white')
            changeColor(pos + jTet.rotate[state][tetrominoPos.indexOf(pos)], color)
            return pos + jTet.rotate[state][tetrominoPos.indexOf(pos)]
          })
        state < 3 ? state++ : state = 0
        break
        // down
      case 40:
        if (y < width - 1)
          tetrominoPos = tetrominoPos.map(pos => {
            changeColor(pos, 'white')
            changeColor(pos + 10, color)
            return pos + 10
          })
        break
      default:
        console.log('invalid key')
    }
  }



  // Event Listeners
  document.addEventListener('keyup', handleKeyUp)

}

window.addEventListener('DOMContentLoaded', init)