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

function setTankPosition(tankStyle, position, rotateDegrees) {
  document.getElementById("tank").style[tankStyle] = position + "px"
  
  let rotate = "rotate(" + rotateDegrees + "deg)"
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
  let tankTop = getTop() - 19
  let notTouchUpBorder = (tankTop >= 0)

  if (notTouchUpBorder) {
    setTankPosition("top", tankTop, 0)
  }

  if(stepIntoMine()) {
    explode()
  }
}

function moveDown() {
  let tankTop = getTop() + 19
  let notTouchDownBorder = (tankTop < 190)

  if (notTouchDownBorder) {
    setTankPosition("top", tankTop, 180)
  }

  if(stepIntoMine()) {
    explode()
  }
}

function moveLeft() {
  let tankLeft = getLeft() - 19
  let notTouchLeftBorder = (tankLeft >= 0)

  if (notTouchLeftBorder) {
    setTankPosition("left", tankLeft, 270)
  }

  if(stepIntoMine()) {
    explode()
  }
}

function moveRight() {
  let tankLeft = getLeft() + 19
  let notTouchRightBorder = (tankLeft < 190)
  
  if (notTouchRightBorder) {
    setTankPosition("left", tankLeft, 90)
  }

  if(stepIntoMine()) {
    explode()
  }
}