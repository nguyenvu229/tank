const UP = 0
const DOWN = 180
const LEFT = 270
const RIGHT = 90

let tankDirection
let bulletDirection
let hp = 20
let mineTop
let mineLeft

let addTop = 0
let addLeft = 0
getMinePosition()
// randomGhostPosition()


function getMinePosition() {
  mineTop = document.getElementById("bomb").style["top"]
  mineTop = parseInt(mineTop)

  mineLeft = document.getElementById("bomb").style["left"]
  mineLeft = parseInt(mineLeft)
}

function getTankTop() {
  let top = document.getElementById("tank").style["top"]
  top = parseInt(top)
  return top
}

function getTankLeft() {
  let left = document.getElementById("tank").style["left"]
  left = parseInt(left)
  return left
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
  let curTop = getTankTop()
  let curLeft = getTankLeft()

  let isOnMine = (curTop == mineTop && curLeft == mineLeft)
  return isOnMine
}

function resetGame() {
  turnTank(UP)
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

function pushTank(tankStyle, position) {
  document.getElementById("tank").style[tankStyle] = position + "px"
}

function turnTank(rotate) {
  tankDirection = rotate
  rotate = "rotate(" + rotate + "deg)"
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
  let TankOnTop = (getTankTop() == 0)
  let TankOnLeft = (getTankLeft() == 0)
  let TankOnDown = (getTankTop() == (380 - 38))
  let TankOnRight = (getTankLeft() == (380 - 38))

  let bulletTop = getTankTop() + addTop
  let bulletLeft = getTankLeft() + addLeft

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
  let isOnTop = (getTankTop() == 0)

  if (!isOnTop) {
    let tankTop = getTankTop() - 38
    pushTank("top", tankTop)
    turnTank(UP)
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 10000)
  }
}

function moveDown() {
  let isOnDown = (getTankTop() == 380 - 38)

  if (!isOnDown) {
    let tankTop = getTankTop() + 38
    pushTank("top", tankTop)
    turnTank(DOWN)
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function moveLeft() {
  let isOnLeft = (getTankLeft() == 0)

  if (!isOnLeft) {
    let tankLeft = getTankLeft() - 38
    pushTank("left", tankLeft)
    turnTank(LEFT)
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function moveRight() {
  let isOnRight = (getTankLeft() == 380 - 38)

  if (!isOnRight) {
    let tankLeft = getTankLeft() + 38
    pushTank("left", tankLeft)
    turnTank(RIGHT)
  }
  if (stepOnMine()) {
    explode()
    setTimeout(resetGame(), 1000)
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}