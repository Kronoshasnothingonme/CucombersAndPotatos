const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,400/300,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(400,300);
document.body.appendChild(renderer.domElement);

camera.position.z = 8;

// cue ball
const cue = new THREE.Mesh(
  new THREE.SphereGeometry(0.3,32,32),
  new THREE.MeshBasicMaterial({color:0xffffff})
);

scene.add(cue);

let balls = [cue];
let vx=0, vz=0;

let game = {
  turn:1,
  cueBallInHand:false,
  fouled:false
};

// 🎯 input shot
document.addEventListener("click",()=>{
  if(game.turn !== 1) return;

  vx = (Math.random()-0.5)*0.6;
  vz = (Math.random()-0.5)*0.6;

  cue.spin = {x:(Math.random()-0.5)*0.3, z:(Math.random()-0.5)*0.3};

  game.turn = 2;
  setTimeout(aiTurn,1200);
});

// 🧠 AI
function aiTurn(){
  vx = (Math.random()-0.5)*0.5;
  vz = (Math.random()-0.5)*0.5;

  cue.spin = {x:(Math.random()-0.5)*0.2, z:(Math.random()-0.5)*0.2};

  game.turn = 1;
}

// ⚙️ physics
function applySpin(){
  cue.vx = (cue.vx||vx) + (cue.spin?.x||0);
  cue.vz = (cue.vz||vz) + (cue.spin?.z||0);
}

function walls(){
  if(Math.abs(cue.position.x)>5){
    vx*=-0.9;
  }
  if(Math.abs(cue.position.z)>3){
    vz*=-0.9;
  }
}

// main loop
function animate(){
  requestAnimationFrame(animate);

  cue.position.x += vx;
  cue.position.z += vz;

  vx *= 0.985;
  vz *= 0.985;

  walls();

  applySpin();

  renderer.render(scene,camera);
}

animate();
