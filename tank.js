const UP = 0
const DOWN = 180
const LEFT = 270
const RIGHT = 90

let tankTop = 0
let tankLeft = 0
let tankDirection

let bulletTop
let bulletLeft
let bulletDirection
let addBulletTop = 0
let addBulletLeft = 0

let mineTop
let mineLeft

let hp = 20
getMinePosition()


function getMinePosition() {
  mineTop = parseInt(document.getElementById("bomb").style.top)
  mineLeft = parseInt(document.getElementById("bomb").style.left)
}

function stepOnMine() {
  let isOnMine = (tankTop == mineTop && tankLeft == mineLeft)
  return isOnMine
}

function resetMine() {
  mineTop = (Math.floor(Math.random() * 9) + 1) * 38
  mineLeft = (Math.floor(Math.random() * 9) + 1) * 38

  document.getElementById("bomb").style.left = mineLeft + "px"
  document.getElementById("bomb").style.top = mineTop + "px"
  document.getElementById("bomb").style.visibility = "visible"
}

function resetTank() {
  tankTop = 0
  tankLeft = 0
  tankDirection = UP

  document.getElementById("tank").style["transform"] = "rotate(" + tankDirection + "deg)"
  document.getElementById("tank").style.left = 0 + "px"
  document.getElementById("tank").style.top = 0 + "px"
  document.getElementById("tank").src = "tank.png"
}

function redrawTank() {
  document.getElementById("tank").style.top = tankTop + "px"
  document.getElementById("tank").style.left = tankLeft + "px"

  rotate = "rotate(" + tankDirection + "deg)"
  document.getElementById("tank").style["transform"] = rotate
}

function resetGame() {
  resetTank()
  resetMine()
}

function explode() {
  document.getElementById("tank").src = "explosion.png"
  document.getElementById("bomb").style.visibility = "hidden"
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

function haveSpaceToSetBullet() {
  let TankOnTop = (tankTop == 0)
  let TankOnLeft = (tankLeft == 0)
  let TankOnDown = (tankTop == (380 - 38))
  let TankOnRight = (tankLeft == (380 - 38))

  if ((TankOnTop && tankDirection == UP) ||
    (TankOnDown && tankDirection == DOWN) ||
    (TankOnLeft && tankDirection == LEFT) ||
    (TankOnRight && tankDirection == RIGHT)) {

    return false
  }
  return true
}

function setBulletPosition() {
  if (tankDirection == UP) {
    addBulletTop = -38
    addBulletLeft = 0
  } else if (tankDirection == DOWN) {
    addBulletTop = 38
    addBulletLeft = 0
  } else if (tankDirection == LEFT) {
    addBulletTop = 0
    addBulletLeft = -38
  } else if (tankDirection == RIGHT) {
    addBulletTop = 0
    addBulletLeft = 38
  }

  if (haveSpaceToSetBullet()) {
    bulletTop = tankTop + addBulletTop
    bulletLeft = tankLeft + addBulletLeft

    document.getElementById("bullet").style.left = bulletLeft + "px"
    document.getElementById("bullet").style.top = bulletTop + "px"
    document.getElementById("bullet").style.visibility = "visible"
  }
}

function bulletOnBorder() {
  let BulletOnTop = (bulletTop == 0)
  let BulletOnLeft = (bulletLeft == 0)
  let BulletOnDown = (bulletTop == (380 - 38))
  let BulletOnRight = (bulletLeft == (380 - 38))

  if ((BulletOnTop && bulletDirection == UP) ||
    (BulletOnDown && bulletDirection == DOWN) ||
    (BulletOnLeft && bulletDirection == LEFT) ||
    (BulletOnRight && bulletDirection == RIGHT)) {

    return true
  }
  return false
}

function moveBullet(id) {
  if (bulletOnBorder()) {
    clearInterval(id)
    document.getElementById("bullet").style.visibility = "hidden"
  } else {
    bulletTop += addBulletTop
    bulletLeft += addBulletLeft

    document.getElementById("bullet").style.left = bulletLeft + "px"
    document.getElementById("bullet").style.top = bulletTop + "px"
  }
}

function fire() {
  bulletDirection = tankDirection
  setBulletPosition()

  function implementFire() {
    moveBullet(id)
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

  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function moveUp() {
  let isOnTop = (tankTop == 0)

  if (!isOnTop) {
    tankTop = tankTop - 38
    tankDirection = UP
    redrawTank()
  }
}

function moveDown() {
  let isOnDown = (tankTop == 380 - 38)

  if (!isOnDown) {
    tankTop = tankTop + 38
    tankDirection = DOWN
    redrawTank()
  }
}

function moveLeft() {
  let isOnLeft = (tankLeft == 0)

  if (!isOnLeft) {
    tankLeft = tankLeft - 38
    tankDirection = LEFT
    redrawTank()
  }
}

function moveRight() {
  let isOnRight = (tankLeft == 380 - 38)

  if (!isOnRight) {
    tankLeft = tankLeft + 38
    tankDirection = RIGHT
    redrawTank()
  }
}