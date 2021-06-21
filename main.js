import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Material } from 'three'

// document.querySelector('#app').innerHTML = `
//   <h1>Helloaasasasasaaaaaaaaaaaaaa Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

// Initiate 
const gui = new dat.GUI()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGL1Renderer({
  alpha: false
})
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


// Canvas
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(devicePixelRatio)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 5))

document.body.appendChild(renderer.domElement)

/*
Object parameters
*/

// Object geometry
const geometry = new THREE.TorusKnotBufferGeometry(5, 1.4, 500, 100)

// Normal Map
const textureLoader = new THREE.TextureLoader()
const normalMap = textureLoader.load('static/textures/peanutbutterNormal.jpg')

// Materials
const material = new THREE.MeshStandardMaterial()
material.normalMap = normalMap;
material.color = new THREE.Color(0xA9A9A9)
// material.emissive = new THREE.Color(0x00FF00)


var params = {color: "#1861b3" };
var update = function () {
  var colorObj = new THREE.Color( params.color );
  material.color = colorObj
};

gui.addColor(params, 'color').onChange(update)


// Mesh, set-up object
const sphere = new THREE.Mesh(geometry,material)
// sphere.position.z = -20
scene.add(sphere)

/*
  Lighting
*/

const pointLight = new THREE.PointLight(0x00ffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xFF0000, 1)
pointLight2.position.set(-6,-6.5,-8.3)
pointLight2.intensity = 1
scene.add(pointLight2)

gui.add(pointLight2.position, 'x').min(-10).max(10).step(0.01)
gui.add(pointLight2.position, 'y').min(-10).max(10).step(0.01)
gui.add(pointLight2.position, 'z').min(-10).max(10).step(0.01)
gui.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

/*
  Animate objects
*/

// Get mouse location
const mouse ={
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove', (event) =>{
  // mouse.x = (event.clientX / innerWidth)*2 -1;
  // mouse.y = -(event.clientY / innerHeight)*2 +1;
  mouse.x = (event.clientX - (innerWidth/2))
  mouse.y = (event.clientY - (innerHeight/2))
})

let targetX = 0
let targetY = 0

// Default object movement
function rotate(){
  requestAnimationFrame(rotate)

  targetX = mouse.x*0.001
  targetY = mouse.y*0.001

  sphere.rotation.y += 0.001
  // sphere.rotation.x += 0.001*mouse.x
  // sphere.rotation.y += 0.001*mouse.y
  // sphere.rotation.x += 0.5 * (targetY - sphere.rotation.y)

  renderer.render(scene, camera)
}
rotate()


 // OrbitControl, move camera with mouse

const controls = new OrbitControls(camera, renderer.domElement)
// controls.maxDistance = 1000
// controls.panSpeed = 0.1
controls.touches = {
	ONE: THREE.TOUCH.ROTATE,
	TWO: THREE.TOUCH.DOLLY_PAN
} 

function animateCamera(){
  // requestAnimationFrame(animateCamera)
  // controls.update();
	// renderer.render( scene, camera );
}
// animateCamera()





/*
  Render Scene
*/

// Auto-resize
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const helper = new THREE.CameraHelper( camera );
scene.add( helper );
//
camera.position.z = 20
// renderer.render(scene, camera)



