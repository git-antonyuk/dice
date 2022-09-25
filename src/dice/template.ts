import Dice from "./Dice";

export default function diceTemplate() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div id="wrapper"></div>
    <button id="rollDice" type="button">Roll dice</button>
  `;

  const wrapperElement = document.querySelector<HTMLDivElement>("#wrapper");
  const buttonElement = document.querySelector<HTMLButtonElement>("#rollDice");

  if (buttonElement === null) {
    console.warn("Dice template, can't find buttonElement");
    return;
  }

  if (wrapperElement === null) {
    console.warn("Dice template, can't find wrapperElement");
    return;
  }

  new Dice(buttonElement, 0, wrapperElement);
}
