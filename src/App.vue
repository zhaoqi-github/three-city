<template>
  <div class="container" ref="containerRef"></div>
</template>

<script setup>
/* eslint-disable */
import * as THREE from "three";
import { City } from './enter/city'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import {ref, onMounted} from 'vue'

const containerRef = ref(null);
// 场景
const scene = new THREE.Scene();

// 相机
let width = window.innerWidth; //窗口宽度
let height = window.innerHeight; //窗口高度
const camera =  new THREE.PerspectiveCamera(45, width / height, 1, 100000);
camera.position.set(1000, 500, 100)
camera.lookAt(0, 0, 0);

// 添加灯光
scene.add(new THREE.AmbientLight(0xadadad))
const directionLight = new THREE.DirectionalLight(0xffffff)
directionLight.position.set(0,0,0)
scene.add(directionLight)

// 渲染器
var renderer = new THREE.WebGLRenderer({
  antialias:true,//开启优化锯齿
});
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 设置像素比
renderer.setClearColor(new THREE.Color(0x000000), 1) // 设置场景颜色

// 添加相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 是否有惯性
// controls.enableZoom = false; // 是否可以缩放
controls.minDistance = 100; // 最近和最远距离
controls.maxDistance = 2000;
controls.enablePan = true; // 开启右键拖动

const city = new City(scene);

// 渲染函数
function render() {
  city.start();

  renderer.render(scene, camera);
  requestAnimationFrame(render)
}

// 物体
// const geometry = new THREE.BoxGeometry( 100, 100, 100 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

onMounted(()=>{

  containerRef.value.appendChild(renderer.domElement)

  render();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight  // 更新宽高比
    camera.updateProjectionMatrix() // 更新相机的投影矩阵

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 设置像素比
  })

})
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html, body{
  overflow: hidden;
}
.container {
  height: 100vh;
  width: 100vw;
}
</style>
