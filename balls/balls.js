const ballCountElement = document.getElementById('ballCount');
let count = 0;

const canvas = document.getElementById('balls'); 
const ctx = canvas.getContext('2d');


  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
  }

  function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  }

  class Shape {
    constructor(x, y, velX, velY) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
    }
  }

  class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY);
      this.color = color;
      this.size = size;
      this.exists = true;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }

    update() {
      if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
        this.velX = -this.velX;
      }

      if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
        this.velY = -this.velY;
      }

      this.x += this.velX;
      this.y += this.velY;
    }

    collisionDetect() {
      for (const ball of balls) {
        if (!(this === ball) && ball.exists) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < this.size + ball.size) {
            ball.color = this.color = randomRGB();
          }
        }
      }
    }
  }

  class EvilCircle extends Shape {
    constructor() {
      super(width / 2, height / 2, 20, 20);
      this.color = "white";
      this.size = 10;
      canvas.addEventListener('mousemove', (e) => {
        this.x = e.clientX;
        this.y = e.clientY;
      });
    }

    draw() {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
    }

    checkBounds() {
      if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
        this.velX = -this.velX;
      }

      if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
        this.velY = -this.velY;
      }
    }

    collisionDetect() {
      for (const ball of balls) {
        if (ball.exists) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < this.size + ball.size) {
            ball.exists = false;
            count--;
            ballCountElement.textContent = 'Ball count: ' + count;
          }
        }
      }
    }
  }

  const balls = [];
  while (balls.length < 50) {
    const size = random(20, 30);
    const ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
    );
    balls.push(ball);
    count++;
    ballCountElement.textContent = 'Ball count: ' + count;
  }

  const evilBall = new EvilCircle();

  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
      if (ball.exists) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
      }
    }

    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();

    requestAnimationFrame(loop);
  }

  document.getElementById("resetBallsButton").addEventListener("click", () => {
  balls.length = 0;
  count = 0;
  while (balls.length < 50) {
    const size = random(20, 30);
    const ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
    );
    balls.push(ball);
    count++;
    ballCountElement.textContent = 'Ball count: ' + count;
  }
});


  loop();