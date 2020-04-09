function init() {

  // Grid System
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
  drawGrid(ctx, w, h, block)

  // tetromino system

  function createTetro(x, y, color) {
    ctx.fillStyle = 'green'
    ctx.fillRect(3 * block, 2 * block, block, block)
    ctx.strokeStyle = 'black'
    ctx.strokeRect(3 * block, 2 * block, block, block)
  }



  }
  
  


}

window.addEventListener('DOMContentLoaded', init)