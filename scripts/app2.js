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
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const cell = document.createElement('div')
        cell.dataset.row = row
        cell.dataset.col = col
        grid.appendChild(cell)
        cells.push(cell)
        cell.dataset.row < 4 ? cell.classList.add('hidden-grid') : null
      }
    }
  }

  createGrid()

  // create tetrominos
  const jTet = {
    starting: [34, 35, 25, 15],
    color: 'blue',
    rotate: [
      [-20, -11, 0, 11],
      [2, -9, 0, 9],
      [20, 11, 0, -11],
      [-2, 9, 0, -9]
    ],
    state: 0
  }

  function changeColor(place, color) {
    cells[place].style.backgroundColor = color
  }


  function addClass(pos) {
    cells[pos].classList.add('occupied')
  }

  function removeClass(pos) {
    cells[pos].classList.remove('occupied')
  }

  function lockClass(pos) {
    cells[pos].classList.add('locked')
  }

  function createTetrominos(tet) {
    tet.starting.forEach(place => {
      // changeColor(place, tet.color)
      tetrominoPos.push(place)
      console.log(cells[place])
      addClass(place)
      console.log(cells[place])
      color = tet.color
    })
    drop()
  }

  // drop function
  function drop() {
    const dropId = setInterval(() => {
      if (tetrominoPos[0] + 10 < 239) {
        tetrominoPos = tetrominoPos.map(pos => {

          // changeColor(pos, 'white')
          // if ((cells[pos - 10].classList.constains('occupied'))) {} doesn't work
          removeClass(pos)

          // changeColor(pos + 10, color)
          addClass(pos + 10)
          return pos + 10
        })
      } else {
        tetrominoPos.forEach(pos => {
          // changeColor(pos, 'black')
          lockClass(pos)
          clearInterval(dropId)
        })
        return
      }
    }, 400)
  }

  createTetrominos(jTet)

  function handleKeyUp(event) {
    // removes old class in old position
    const x = tetrominoPos[0] % width
    const y = Math.floor(tetrominoPos[0] / height)
    switch (event.keyCode) {
      // right
      case 39:
        if (x < width - 1)
          tetrominoPos = tetrominoPos.map(pos => {
            // changeColor(pos, 'white')
            removeClass(pos)
            // changeColor(pos++, color)
            addClass(pos++)
            return pos++
          })
        break
        // left
      case 37:
        if (x > 0)
          tetrominoPos = tetrominoPos.map(pos => {
            // changeColor(pos, 'white')
            removeClass(pos)
            // changeColor(pos--, color)
            addClass(pos--)
            return pos--
          })

        break
        // up/rotate
      case 38:
        tetrominoPos = tetrominoPos.map(pos => {
          // changeColor(pos, 'white')
          removeClass(pos)
          // changeColor(pos + jTet.rotate[state][tetrominoPos.indexOf(pos)], color)
          addClass(pos + jTet.rotate[state][tetrominoPos.indexOf(pos)])
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