import DiceThree from "./DiceThree";

class Dice {
  private buttonElement: HTMLButtonElement;
  private timeout: number;
  private diceThree: DiceThree;

  constructor(
    buttonElement: HTMLButtonElement,
    timeout: number = 3000,
    wrapperElement: HTMLDivElement
  ) {
    this.buttonElement = buttonElement;
    this.timeout = timeout;
    this.buttonElement.addEventListener("click", this.roll.bind(this));
    // wrapperElement.addEventListener("click", this.roll.bind(this));
    this.diceThree = new DiceThree(wrapperElement)
  }

  private async roll() {
    this.buttonElement.disabled = true;
    await this.diceThree.roll();
    this.buttonElement.disabled = false;
  }
}

export default Dice;
