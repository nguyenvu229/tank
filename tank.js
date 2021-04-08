const UP = 0
const DOWN = 180
const LEFT = 270
const RIGHT = 90

let tankTop = 0
let tankLeft = 0

let bulletTop
let bulletLeft

let tankDirection
let bulletDirection
let hp = 20
let mineTop
let mineLeft

let addTop = 0
let addLeft = 0
getMinePosition()


function getMinePosition() {
  mineTop = document.getElementById("bomb").style["top"]
  mineTop = parseInt(mineTop)

  mineLeft = document.getElementById("bomb").style["left"]
  mineLeft = parseInt(mineLeft)
}

function stepOnMine() {
  let isOnMine = (tankTop == mineTop && tankLeft == mineLeft)
  return isOnMine
}

function resetGame() {
  document.getElementById("tank").style["transform"] = UP
  tankTop = 0
  tankLeft = 0

  document.getElementById("tank").style.left = 0 + "px"
  document.getElementById("tank").style.top = 0 + "px"
  document.getElementById("tank").src = "tank.png"

  mineTop = (Math.floor(Math.random() * 9) + 1) * 38
  mineLeft = (Math.floor(Math.random() * 9) + 1) * 38

  document.getElementById("bomb").style["left"] = mineLeft + "px"
  document.getElementById("bomb").style["top"] = mineTop + "px"
  document.getElementById("bomb").style.visibility = "visible"
}

function explode() {
  document.getElementById("tank").src = "explosion.png"
  document.getElementById("bomb").style.visibility = "hidden"
}

function redrawTank() {
  document.getElementById("tank").style.top = tankTop + "px"
  document.getElementById("tank").style.left = tankLeft + "px"

  rotate = "rotate(" + tankDirection + "deg)"
  document.getElementById("tank").style["transform"] = rotate
}

function getHit() {
  if (hp > 0) {
    hp--
    let hpColor

    if (10 < hp && hp < 20) {
      hpColor = "black"
    } else if (6 <= hp && hp <= 10) {
      hpColor = "yellow"
    } else if (hp < 6) {
      hpColor = "red"
    }

    document.getElementById("hp").innerHTML = "HP: " + hp
    document.getElementById("hp").style["color"] = hpColor
  }
}

function setBulletPosition() {
  let TankOnTop = (tankTop == 0)
  let TankOnLeft = (tankLeft == 0)
  let TankOnDown = (tankTop == (380 - 38))
  let TankOnRight = (tankLeft == (380 - 38))

  bulletTop = tankTop + addTop
  bulletLeft = tankLeft + addLeft

  if ((TankOnTop && tankDirection == UP) ||
    (TankOnDown && tankDirection == DOWN) ||
    (TankOnLeft && tankDirection == LEFT) ||
    (TankOnRight && tankDirection == RIGHT)) {

  } else {
    document.getElementById("bullet").style.left = bulletLeft + "px"
    document.getElementById("bullet").style.top = bulletTop + "px"
    document.getElementById("bullet").style.visibility = "visible"
  }
}

function moveBullet(bulletDirection, id) {
  let BulletOnTop = (bulletTop == 0)
  let BulletOnLeft = (bulletLeft == 0)
  let BulletOnDown = (bulletTop == (380 - 38))
  let BulletOnRight = (bulletLeft == (380 - 38))

  if ((BulletOnTop && bulletDirection == UP) ||
    (BulletOnDown && bulletDirection == DOWN) ||
    (BulletOnLeft && bulletDirection == LEFT) ||
    (BulletOnRight && bulletDirection == RIGHT)) {

    clearInterval(id)
    document.getElementById("bullet").style.visibility = "hidden"
  } else {
    bulletTop += addTop
    bulletLeft += addLeft

    document.getElementById("bullet").style.left = bulletLeft + "px"
    document.getElementById("bullet").style.top = bulletTop + "px"
  }
}

function fire() {
  if (tankDirection == UP) {
    addTop = -38
    addLeft = 0
  } else if (tankDirection == DOWN) {
    addTop = 38
    addLeft = 0
  } else if (tankDirection == LEFT) {
    addTop = 0
    addLeft = -38
  } else if (tankDirection == RIGHT) {
    addTop = 0
    addLeft = 38
  }

  setBulletPosition()
  bulletDirection = tankDirection

  function implementFire() {
    moveBullet(bulletDirection, id)
  }
  let id
  id = setInterval(implementFire, 100)
}

function moveTank(e) {
  let keyCode = e.key

  if (keyCode == "ArrowUp") {
    moveUp()
  } else if (keyCode == "ArrowDown") {
    moveDown()
  } else if (keyCode == "ArrowLeft") {
    moveLeft()
  } else if (keyCode == "ArrowRight") {
    moveRight()
  }
}

function moveUp() {
  let isOnTop = (tankTop == 0)

  if (!isOnTop) {
    tankTop = tankTop - 38
    tankDirection = UP
    redrawTank()
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 10000)
  }
}

function moveDown() {
  let isOnDown = (tankTop == 380 - 38)

  if (!isOnDown) {
    tankTop = tankTop + 38
    tankDirection = DOWN
    redrawTank()
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function moveLeft() {
  let isOnLeft = (tankLeft == 0)

  if (!isOnLeft) {
    tankLeft = tankLeft - 38
    tankDirection = LEFT
    redrawTank()
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function moveRight() {
  let isOnRight = (tankLeft == 380 - 38)

  if (!isOnRight) {
    tankLeft = tankLeft + 38
    tankDirection = RIGHT
    redrawTank()
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}