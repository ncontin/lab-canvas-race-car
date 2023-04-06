//canvas id="canvas" width="500" height="700"></canvas>

const canvas = document.querySelector("canvas");
canvas.style.border = "2px solid black";

const ctx = canvas.getContext("2d");

const startScreen = document.querySelector(".game-intro");

const bgImg = new Image();
bgImg.src = "/images/road.png";
const carImg = new Image();
carImg.src = "/images/car.png";

window.onload = () => {
  //hide the canvas until we press the start
  /*   canvas.style.display = "none"; */
  const drawBg = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  };
  drawBg();
  let carX = canvas.width / 2 - 25;
  let carY = canvas.height - 120;
  let carWidth = 50;
  let carHeight = 90;
  const carSpeed = 2;
  let isMovingLeft = false;
  let isMovingRight = false;
  let animateId;
  let myObstacles = [];
  let obstacleY = 0;
  let obstacleX = Math.floor(Math.random() * (canvas.width - 50));
  let obstacleWidth = Math.floor(Math.random() * canvas.width - 150);
  let obstacleHeight = 30;
  let obstacleSpeedX = 2;
  let obstacleSpeedY = 2;
  let obstacle = [];
  const drawObstacles = () => {
    const intervalId = setInterval(function () {
      let i = 0;
      obstacleX = Math.floor(Math.random() * (canvas.width - 50));
      obstacleWidth = Math.floor(Math.random() * canvas.width - carWidth - 50);
      ctx.fillStyle = "red";
      // xPos, yPos, width, height
      ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);

      i++;

      if (i > 10) {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  drawObstacles();

  const drawCar = () => {
    ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
  };

  drawCar();

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBg();
    drawCar();
    drawObstacles();
    if (isMovingLeft && carX > 0) {
      carX -= carSpeed;
    } else if (isMovingRight && carX < canvas.width - carWidth) {
      carX += carSpeed;
    }

    obstacleY += obstacleSpeedY;

    animateId = requestAnimationFrame(animate);
  };

  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  document.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.keyCodes == 39 || event.key === "a") {
      isMovingLeft = true;
    }
    if (event.keyCodes == 37 || event.key === "d") {
      isMovingRight = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    console.log(event);
    if (event.keyCodes == 39 || event.key === "a") {
      isMovingLeft = false;
    }
    if (event.keyCodes == 37 || event.key === "d") {
      isMovingRight = false;
    }
  });

  function startGame() {
    console.log("start game");
    startScreen.style.display = "none";
    canvas.style.display = "block";
    isMovingLeft = false;
    isMovingRight = false;
    animate();
  }
};

/* const drawCar = () => {
  ctx.beginPath();
  ctx.fillStyle = "teal";
  // xPos, yPos, width, height
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fill();
  ctx.closePath();
};
 */

/* 
ctx.drawImage(carImg, canvas.width / 2 - 25, canvas.height - 120, 50, 90);

    car */
