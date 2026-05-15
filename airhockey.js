const canvas = document.getElementById('airhockeyCanvas');
const ctx = canvas.getContext('2d');

const puck = { x: canvas.width / 2, y: canvas.height / 2, radius: 5, vx: 0, vy: 0 };
const paddle1 = { x: 20, y: canvas.height / 2, width: 10, height: 60, speed: 0 };
const paddle2 = { x: canvas.width - 30, y: canvas.height / 2, width: 10, height: 60, speed: 0 };

let score1 = 0, score2 = 0;

window.addEventListener('keydown', (e) => {
  if (e.key === 'w') paddle1.speed = -5;
  if (e.key === 's') paddle1.speed = 5;
  if (e.key === 'ArrowUp') paddle2.speed = -5;
  if (e.key === 'ArrowDown') paddle2.speed = 5;
});

window.addEventListener('keyup', () => {
  paddle1.speed = 0;
  paddle2.speed = 0;
});

function animate() {
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update paddles
  paddle1.y = Math.max(0, Math.min(canvas.height - paddle1.height, paddle1.y + paddle1.speed));
  paddle2.y = Math.max(0, Math.min(canvas.height - paddle2.height, paddle2.y + paddle2.speed));

  // Update puck
  puck.x += puck.vx;
  puck.y += puck.vy;
  puck.vx *= 0.99;
  puck.vy *= 0.99;

  // Bounce off top/bottom
  if (puck.y - puck.radius < 0 || puck.y + puck.radius > canvas.height) {
    puck.vy *= -1;
    puck.y = Math.max(puck.radius, Math.min(canvas.height - puck.radius, puck.y));
  }

  // Paddle collision
  if (puck.x - puck.radius < paddle1.x + paddle1.width && puck.y > paddle1.y && puck.y < paddle1.y + paddle1.height) {
    puck.vx = 5;
  }
  if (puck.x + puck.radius > paddle2.x && puck.y > paddle2.y && puck.y < paddle2.y + paddle2.height) {
    puck.vx = -5;
  }

  // Score
  if (puck.x < 0) { score2++; puck.x = canvas.width / 2; puck.y = canvas.height / 2; puck.vx = 0; puck.vy = 0; }
  if (puck.x > canvas.width) { score1++; puck.x = canvas.width / 2; puck.y = canvas.height / 2; puck.vx = 0; puck.vy = 0; }

  // Draw
  ctx.fillStyle = 'white';
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.beginPath();
  ctx.arc(puck.x, puck.y, puck.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'yellow';
  ctx.font = '20px Arial';
  ctx.fillText(`P1: ${score1}`, 50, 30);
  ctx.fillText(`P2: ${score2}`, canvas.width - 100, 30);

  requestAnimationFrame(animate);
}

animate();