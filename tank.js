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

function stepIntoMine() {
  let curTop = getTop()
  let curLeft = getLeft()

  let check = (curTop == mineTop && curLeft == mineLeft)
  return check
}

function explode() {
  document.getElementById("tank").src = "explosion.png"
  document.getElementById("boom").style.visibility = "hidden"
}

function setTankPosition(tankStyle, position) {
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
    setTankPosition("top", tankTop)
    turnTank(UP)
  }

  if(stepIntoMine()) {
    explode()
  }
}

function moveDown() {
  let isOnDown = (getTop() == 190 - 19)
  
  if(!isOnDown) {
    let tankTop = getTop() + 19
    setTankPosition("top", tankTop)
    turnTank(DOWN)
  }

  if(stepIntoMine()) {
    explode()
  }
}

function moveLeft() {
  let isOnLeft = (getLeft() == 0)
  
  if(!isOnLeft) {
    let tankLeft = getLeft() - 19
    setTankPosition("left", tankLeft)
    turnTank(LEFT)
  }

  if(stepIntoMine()) {
    explode()
  }
}

function moveRight() {
  let isOnRight = (getLeft() == 190 - 19)
  
  if(!isOnRight) {
    let tankLeft = getLeft() + 19
    setTankPosition("left", tankLeft)
    turnTank(RIGHT)
  }

  if(stepIntoMine()) {
    explode()
  }
}