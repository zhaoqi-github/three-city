// import '../base/index.css'
import * as THREE from 'three';

export const initCity = () => {
  const width = window.innerWidth;
  const height = window.innerHeight; 
   
  // 获取canvas元素
  const canvas = document.getElementById('webgl');

  // 场景
  const scene = new THREE.Scene();

  // 相机
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.set(1000, 500, 100)
  camera.lookAt(0, 0, 0);

  // 添加灯光
  scene.add(new THREE.AmbientLight(0xadadad))
  const directionLight = new THREE.DirectionalLight(0xffffff)
  scene.add(directionLight)

  // 渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置像素比
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // // 设置场景颜色
  // renderer.setClearColor(new THREE.Color(0x000000), 1)
  document.body.appendChild(renderer.domElement);


  const start = () => {
    // 渲染场景
    renderer.render(scene, camera)

    requestAnimationFrame(start)
  }

  start();

  window.addEventListener('resize', ()=>{
    camera.aspect = width / height;
    // 更新相机的投影矩阵
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    // 设置像素比
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
}