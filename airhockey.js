const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,400/300,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(400,300);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

// puck
const puck = new THREE.Mesh(
  new THREE.CylinderGeometry(0.3,0.3,0.2),
  new THREE.MeshBasicMaterial({color:0xffffff})
);

scene.add(puck);

let vx=0.1, vz=0.1;

const ai = {x:0};

// movement
function animate(){
  requestAnimationFrame(animate);

  puck.position.x += vx;
  puck.position.z += vz;

  if(Math.abs(puck.position.x)>5) vx*=-0.95;
  if(Math.abs(puck.position.z)>3) vz*=-0.95;

  ai.x += (puck.position.x - ai.x)*0.06;

  renderer.render(scene,camera);
}

animate();
