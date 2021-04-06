const UP = 0
const DOWN = 180
const LEFT = 270
const RIGHT = 90

let bulletDirection
let hp = 20
let mineTop
let mineLeft

let addTop = 0
let addLeft = 0
getMinePosition()
// randomGhostPosition()

let tankDatas = [[0, 0, UP], [0, 1 * 38, UP], [0, 2 * 38, UP], [0, 3 * 38, UP]]

function getMinePosition() {
  mineTop = document.getElementById("bomb").style["top"]
  mineTop = parseInt(mineTop)

  mineLeft = document.getElementById("bomb").style["left"]
  mineLeft = parseInt(mineLeft)
}

function getBulletTop() {
  let top = document.getElementById("bullet").style["top"]
  top = parseInt(top)
  return top
}

function getBulletLeft() {
  let left = document.getElementById("bullet").style["left"]
  left = parseInt(left)
  return left
}

function stepOnMine() {
  let isOnMine = (tankDatas[0][0] == mineTop && tankDatas[0][1] == mineLeft)
  return isOnMine
}

function resetGame() {
  turnTank(UP)
  tankDatas[0][1] = 0
  tankDatas[0][0] = 0
  document.getElementById("tank").style.left = tankDatas[0][1] + "px"
  document.getElementById("tank").style.top = tankDatas[0][0] + "px"
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

function redrawTanks() {
  for (let i = 0; i < tankDatas.length; i++) {
    let id = "tank" + i
    document.getElementById(id).style["top"] = tankDatas[i][0] + "px"
    document.getElementById(id).style["left"] = tankDatas[i][1] + "px"
    rotate = "rotate(" + tankDatas[i][2] + "deg)"
    document.getElementById(id).style["transform"] = rotate
  }
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
  let TankOnTop = (tankDatas[0][0] == 0)
  let TankOnLeft = (tankDatas[0][1] == 0)
  let TankOnDown = (tankDatas[0][0] == (380 - 38))
  let TankOnRight = (tankDatas[0][1] == (380 - 38))

  let bulletTop = tankDatas[0][0] + addTop
  let bulletLeft = tankDatas[0][1] + addLeft

  if ((TankOnTop && tankDatas[0][2] == UP) ||
    (TankOnDown && tankDatas[0][2] == DOWN) ||
    (TankOnLeft && tankDatas[0][2] == LEFT) ||
    (TankOnRight && tankDatas[0][2] == RIGHT)) {

  } else {
    document.getElementById("bullet").style.left = bulletLeft + "px"
    document.getElementById("bullet").style.top = bulletTop + "px"
    document.getElementById("bullet").style.visibility = "visible"
  }
}

function moveBullet(bulletDirection, id) {
  let bulletTop = getBulletTop()
  let bulletLeft = getBulletLeft()

  let BulletOnTop = (getBulletTop() == 0)
  let BulletOnLeft = (getBulletLeft() == 0)
  let BulletOnDown = (getBulletTop() == (380 - 38))
  let BulletOnRight = (getBulletLeft() == (380 - 38))

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
  if (tankDatas[0][2] == UP) {
    addTop = -38
    addLeft = 0
  } else if (tankDatas[0][2] == DOWN) {
    addTop = 38
    addLeft = 0
  } else if (tankDatas[0][2] == LEFT) {
    addTop = 0
    addLeft = -38
  } else if (tankDatas[0][2] == RIGHT) {
    addTop = 0
    addLeft = 38
  }

  setBulletPosition()
  bulletDirection = tankDatas[0][2]

  function implementFire() {
    moveBullet(bulletDirection, id)
  }
  let id
  id = setInterval(implementFire, 100)
}

function randomGhostPosition() {
  let ghostTop = new Array(5)
  let ghostLeft = new Array(5)

  for (let i = 0; i < 5; i++) {
    ghostTop[i] = (Math.floor(Math.random() * 9) + 3) * 38
    ghostLeft[i] = (Math.floor(Math.random() * 9) + 3) * 38

    document.getElementById("bullet").style.left = bulletLeft + "px"
    document.getElementById("bullet").style.top = bulletTop + "px"
  }

  // bulletTop += addTop
  // bulletLeft += addLeft

  // document.getElementById("bullet").style.left = bulletLeft + "px"
  // document.getElementById("bullet").style.top = bulletTop + "px"
}

function moveGhost() {

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
  let isOnTop = (tankDatas[0][0] == 0)
  if (!isOnTop) {
    flockCells();
    tankDatas[0][0] = tankDatas[0][0] - 38
    tankDatas[0][2] = UP
    redrawTanks()
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 10000)
  }
}

function moveDown() {
  let isOnDown = (tankDatas[0][0] == 380 - 38)

  if (!isOnDown) {
    flockCells();
    tankDatas[0][0] = tankDatas[0][0] + 38
    tankDatas[0][2] = DOWN

    redrawTanks()
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function moveLeft() {
  let isOnLeft = (tankDatas[0][1] == 0)

  if (!isOnLeft) {
    flockCells();
    tankDatas[0][1] = tankDatas[0][1] - 38
    tankDatas[0][2] = LEFT
    redrawTanks()
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function moveRight() {
  let isOnRight = (tankDatas[0][1] == 380 - 38)

  if (!isOnRight) {
    flockCells();
    tankDatas[0][1] = tankDatas[0][1] + 38
    tankDatas[0][2] = RIGHT
    redrawTanks()
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function flockCells() {
  for (let i = tankDatas.length - 1; i > 0; i--) {
    tankDatas[i][0] = tankDatas[i - 1][0]
    tankDatas[i][1] = tankDatas[i - 1][1]
    tankDatas[i][2] = tankDatas[i - 1][2]
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}