import Dice from "./Dice";

export default function diceTemplate() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div id="wrapper"></div>
    <button id="rollDice" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
      </svg>
      Roll dice
    </button>
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
