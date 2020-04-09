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
    starting: [35, 34, 25, 15],
    color: 'blue'
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
    }, 300)
  }
  // const dropId = setInterval(() => {

  //   if (pos + 10 > 239) {
  //     clearInterval(dropId)
  //     tetrominoPos.forEach(pos => {
  //       cells[pos].style.backgroundColor = 'black'
  //     })
  //     return
  //   }
  // }, 300)




  createTetrominos(jTet)

  // function handleKeyUp(event) {

  //   // removes old class in old position
  //   cells[tetrominoPos].classList.remove('pika')

  //   const x = tetrominoPos % width
  //   const y = Math.floor(tetrominoPos / width)

  //   console.log(event.keyCode)
  //   switch (event.keyCode) {
  //     case 39:
  //       if (x < width - 1)
  //         tetrominoPos++
  //       break
  //     case 37:
  //       if (x > 0)
  //         tetrominoPos--
  //       break
  //     case 38:
  //       if (y > 0)
  //         tetrominoPos -= width
  //       break
  //     case 40:
  //       if (y < width - 1)
  //         tetrominoPos += width
  //       break
  //     default:
  //       console.log('invalid key')
  //   }
  //   // adds class back at new position
  //   cells[tetrominoPos].classList.add('pika')
  // }



  // Event Listeners
  // document.addEventListener('keyup', handleKeyUp)

}

window.addEventListener('DOMContentLoaded', init)