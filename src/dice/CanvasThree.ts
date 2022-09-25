import * as THREE from "three";
import { PerspectiveCamera, WebGLRenderer } from "three";
import debounce from "../utils/debounce";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
//@ts-ignore
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

class CanvasThree {
  public scene = new THREE.Scene();
  private canvas: HTMLCanvasElement = document.createElement("canvas");
  private wrapper: HTMLElement;
  private sizes: {
    width: number;
    height: number;
  } = {
    width: 0,
    height: 0,
  };
  public camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  // public controls!: OrbitControls;
  private dracoLoader = new DRACOLoader();
  private gltfLoader = new GLTFLoader();
  private onTickSubscribed: Function[] = [];

  constructor(id: string = "canvas", wrapper: HTMLElement) {
    this.canvas.id = id;
    this.wrapper = wrapper;
    this.wrapper.append(this.canvas);
    this.setSizes();
    this.addCamera();
    this.addControls();
    this.addRender();
    this.tick();

    this.dracoLoader.setDecoderPath('/draco/gltf/');
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
		this.scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

    window.addEventListener("resize", this.debounced);
  }

  public addTickSubscribed (fn: Function) {
    this.onTickSubscribed.push(fn);
  }

  public loadModel(model: string): Promise<GLTF> {
    return new Promise((resolve) => {
      this.gltfLoader.load(model, (gltf) => resolve(gltf));
    });
  }

  private tick() {
    // const clock = new THREE.Clock();
    // let previousTime = 0;

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime();
      // const deltaTime = elapsedTime - previousTime;
      // previousTime = elapsedTime;

      // this.controls.update();

      // Render
      this.renderer.render(this.scene, this.camera);

      for (let i = 0; i < this.onTickSubscribed.length; i++) {
        const fn = this.onTickSubscribed[i];
        if (fn) {
          fn();
        }
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  private addControls() {
    // this.controls = new OrbitControls(this.camera, this.canvas);
    // this.controls.target.set(0, 0.75, 0);
    // this.controls.enableDamping = true;
    // this.controls.enabled = true;
  }

  private addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 5);
    this.scene.add(this.camera);
  }

  private addRender() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true 
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private setSizes() {
    // this.sizes.width = this.wrapper.clientWidth;
    // this.sizes.height = this.wrapper.clientHeight;
     this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight
  }

  private onResize() {
    this.setSizes();
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private debounced = debounce(this.onResize.bind(this), 500);
}

export default CanvasThree;
