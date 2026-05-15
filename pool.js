const canvas = document.getElementById('poolCanvas');
const ctx = canvas.getContext('2d');

class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.98;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.friction;
    this.vy *= this.friction;

    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.vx *= -1;
      this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.vy *= -1;
      this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
    }
  }
}

const balls = [
  new Ball(canvas.width / 2, canvas.height / 2, 8, 'white')
];

for (let i = 0; i < 5; i++) {
  balls.push(new Ball(canvas.width - 100 + i * 15, canvas.height / 2 + (i - 2) * 15, 8, 'red'));
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  balls[0].vx = (x - balls[0].x) * 0.1;
  balls[0].vy = (y - balls[0].y) * 0.1;
});

function animate() {
  ctx.fillStyle = '#2a5a2a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  balls.forEach(ball => {
    ball.update();
    ball.draw();
  });

  requestAnimationFrame(animate);
}

animate();