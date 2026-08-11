// ============================================================
// M1 周一：第一个 Three.js 场景
// 知识点：Scene / PerspectiveCamera / WebGLRenderer / Mesh / 动画
// ============================================================
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 1. 场景（装所有物体的容器）
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

// 2. 相机（透视相机：视野 75°，宽高比，近裁面 0.1，远裁面 1000）
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 2, 5);
camera.lookAt(0, 0, 0);

// 3. 渲染器（WebGL 画布）
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 高分屏清晰
document.getElementById("app").appendChild(renderer.domElement);

// 4. 物体：蓝色立方体（几何体 + 材质）
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x4a9eff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. 灯光（MeshStandardMaterial 需要光才有立体感）
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // 环境光：整体提亮
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // 平行光：模拟太阳
directionalLight.position.set(5, 8, 5);
scene.add(directionalLight);

// 6. 辅助：网格地面（帮助感知空间）
const gridHelper = new THREE.GridHelper(10, 10, 0x666688, 0x333355);
scene.add(gridHelper);

// 7. 轨道控制：鼠标拖拽旋转 / 滚轮缩放 / 右键平移
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 惯性效果（更顺滑）
controls.dampingFactor = 0.08;

// 8. 动画循环：每一帧执行（浏览器 60 次/秒）
function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01; // 每帧旋转一点
  // cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  controls.update(); // 更新轨道控制（启用 damping 时必需）
  renderer.render(scene, camera);
}
animate();

// 9. 窗口大小变化时自适应（画面不变形）
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});