const UP = 0
const DOWN = 180
const LEFT = 270
const RIGHT = 90


var mineTop
var mineLeft
getMinePosition()

function getMinePosition() {
  mineTop = document.getElementById("boom").style["top"]
  mineTop = parseInt(mineTop)
  
  mineLeft = document.getElementById("boom").style["left"]
  mineLeft = parseInt(mineLeft)
}

function getTop() {
  let top = document.getElementById("tank").style["top"]
  top = parseInt(top)
  return top
}

function getLeft() {
  let left = document.getElementById("tank").style["left"]
  left = parseInt(left)
  return left
}

function stepOnMine() {
  let curTop = getTop()
  let curLeft = getLeft()

  let isOnMine = (curTop == mineTop && curLeft == mineLeft)
  return isOnMine
}

function explode() {
  document.getElementById("tank").src = "explosion.png"
  document.getElementById("boom").style.visibility = "hidden"
}

function pushTank(tankStyle, position) {
  document.getElementById("tank").style[tankStyle] = position + "px"
}

function turnTank(rotate) {
  rotate = "rotate(" + rotate + "deg)"
  document.getElementById("tank").style["transform"] = rotate
}

function moveTank(e) {
  let keyCode = e.key

  if(keyCode == "ArrowUp") {
    moveUp()
  } else if(keyCode == "ArrowDown") {
    moveDown()
  } else if(keyCode == "ArrowLeft") {
    moveLeft()
  } else if(keyCode == "ArrowRight") {
    moveRight()
  }
}

function moveUp() {
  let isOnTop = (getTop() == 0)
  
  if(!isOnTop) {
    let tankTop = getTop() - 19
    pushTank("top", tankTop)
    turnTank(UP)
  }

  if(stepOnMine()) {
    explode()
  }
}

function moveDown() {
  let isOnDown = (getTop() == 190 - 19)
  
  if(!isOnDown) {
    let tankTop = getTop() + 19
    pushTank("top", tankTop)
    turnTank(DOWN)
  }

  if(stepOnMine()) {
    explode()
  }
}

function moveLeft() {
  let isOnLeft = (getLeft() == 0)
  
  if(!isOnLeft) {
    let tankLeft = getLeft() - 19
    pushTank("left", tankLeft)
    turnTank(LEFT)
  }

  if(stepOnMine()) {
    explode()
  }
}

function moveRight() {
  let isOnRight = (getLeft() == 190 - 19)
  
  if(!isOnRight) {
    let tankLeft = getLeft() + 19
    pushTank("left", tankLeft)
    turnTank(RIGHT)
  }

  if(stepOnMine()) {
    explode()
  }
}