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

function explode() {
  let curTop = getTop()
  let curLeft = getLeft()

  let boomTop = document.getElementById("boom").style["top"]
  boomTop = parseInt(boomTop)
  let boomLeft = document.getElementById("boom").style["left"]
  boomLeft = parseInt(boomLeft)

  if(curTop == boomTop && curLeft == boomLeft + 19) {
    document.getElementById("tank").src = "explosion.png"
    document.getElementById("boom").style.visibility = "hidden"
  }
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
  let top = getTop()
  top -= 19
  if (top >= 0) {
    document.getElementById("tank").style["top"] = top + "px"
    document.getElementById("tank").style["transform"] = "rotate(0deg)"
  }
  explode()
}

function moveDown() {
  let top = getTop()
  top += 19
  if (top < 190) {
    document.getElementById("tank").style["top"] = top + "px"
    document.getElementById("tank").style["transform"] = "rotate(180deg)"
  }
  explode()
}

function moveLeft() {
  let left = getLeft()
  left -= 19
  if (left >= 0) {
    document.getElementById("tank").style["left"] = left + "px"
    document.getElementById("tank").style["transform"] = "rotate(270deg)"
  }
  explode()
}

function moveRight() {
  let left = getLeft()
  left += 19
  if (left < 190) {
    document.getElementById("tank").style["left"] = left + "px"
    document.getElementById("tank").style["transform"] = "rotate(90deg)"
  }
  explode()
}