import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import CanvasThree from "./CanvasThree";
import gsap from "gsap";
import randomIntFromInterval from "../utils/randomIntFromInterval";
import * as THREE from "three";

class DiceThree {
  private canvasThree: CanvasThree;

  constructor(wrapperElement: HTMLDivElement) {
    this.canvasThree = new CanvasThree("canvas-dive", wrapperElement);
    this.initModel();
  }

  private diceModel!: GLTF;
  private boom = new THREE.Group();
  private animated = true;

  private async initModel() {
    this.diceModel = await this.canvasThree.loadModel(
      "/models/dice/scene.gltf"
    );
    this.diceModel.scene.scale.set(0.05, 0.05, 0.05);
    this.diceModel.scene.translateY(-1);
    this.canvasThree.scene.add(this.diceModel.scene);

    this.boom.add(this.canvasThree.camera);
    this.canvasThree.scene.add(this.boom);

    await new Promise(resolve => setTimeout(resolve, 300))
    await gsap.fromTo(
      this.boom.rotation,
      { y: 0 },
      { y: Math.PI * 2, duration: 1 }
    );

    this.animated = false;
  }

  private prevX = 0;
  private prevY = 0;

  public async roll() {
    if (this.animated) {
      return;
    }
    this.animated = true;
    const min = 2;
    const max = 12;
    const xRand = randomIntFromInterval(min, max);
    const yRand = randomIntFromInterval(min, max);
    const y = (Math.PI / 2) * xRand;
    const x = (Math.PI / 2) * yRand;
    // await gsap.fromTo(
    //   this.diceModel.scene.rotation,
    //   { x: this.prevX, y: this.prevY },
    //   { x, y, duration: 1 }
    // );

    await gsap.fromTo(
      this.boom.rotation,
      { x: this.prevX, y: this.prevY },
      { x, y, duration: 1 }
    );

    this.prevX = x;
    this.prevY = y;

    this.animated = false;
  }
}

export default DiceThree;
