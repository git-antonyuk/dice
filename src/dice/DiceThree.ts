import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import CanvasThree from "./CanvasThree";
import gsap from "gsap";
import randomIntFromInterval from "../utils/randomIntFromInterval";

function playAudio(audio: HTMLAudioElement) {
  return new Promise((res) => {
    audio.play();
    audio.onended = res;
  });
}

class DiceThree {
  private canvasThree: CanvasThree;
  private audio = new Audio("audio/rollDice.mp3");
  private numberSounds = [
    new Audio("audio/one.mp3"),
    new Audio("audio/two.mp3"),
    new Audio("audio/three.mp3"),
    new Audio("audio/four.mp3"),
    new Audio("audio/five.mp3"),
    new Audio("audio/six.mp3"),
  ];

  constructor(wrapperElement: HTMLDivElement) {
    this.canvasThree = new CanvasThree("canvas-dive", wrapperElement);
    this.initModel();
  }

  private diceModel!: GLTF;
  private animated = false;

  private async initModel() {
    this.diceModel = await this.canvasThree.loadModel(
      "/models/dice/scene.gltf"
    );
    const scale = 0.027;
    this.diceModel.scene.scale.set(scale, scale, scale);
    this.canvasThree.scene.add(this.diceModel.scene);
  }

  public async roll() {
    if (this.animated) {
      return;
    }
    this.animated = true;
    const positions: { [key: number]: { x: number; y: number } } = {
      5: {
        x: Math.PI * 2,
        y: Math.PI * 2,
      },
      3: {
        x: Math.PI * 2,
        y: -Math.PI / 2,
      },
      4: {
        x: Math.PI * 2,
        y: Math.PI / 2,
      },
      2: {
        x: Math.PI * 2,
        y: Math.PI,
      },
      1: {
        x: Math.PI / 2,
        y: Math.PI * 2,
      },
      6: {
        x: -Math.PI / 2,
        y: Math.PI * 2,
      },
    };
    const random: number = randomIntFromInterval(1, 6);
    const randomPositiveNegative = Math.round(Math.random()) * 2 - 1;
    const x = positions[random].x + Math.PI * 2 * randomPositiveNegative;
    const y = positions[random].y + Math.PI * 2 * randomPositiveNegative;

    await Promise.all([
      playAudio(this.audio),
      this.diceModel.scene.rotation.x !== 0 &&
      this.diceModel.scene.rotation.y !== 0
        ? gsap.to(this.diceModel.scene.rotation, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "power2.in",
          })
        : gsap.to(this.diceModel.scene.rotation, {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 1,
            ease: "power2.in",
          }),
    ]);

    await gsap.to(this.diceModel.scene.rotation, {
      x,
      y,
      duration: 1,
      ease: "power2.out",
    });

    await playAudio(this.numberSounds[random - 1]);

    this.animated = false;
  }
}

export default DiceThree;
