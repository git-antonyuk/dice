import DiceThree from "./DiceThree";

class Dice {
  private buttonElement: HTMLButtonElement;  
  private diceThree: DiceThree;

  constructor(
    buttonElement: HTMLButtonElement,
    wrapperElement: HTMLDivElement
  ) {
    this.buttonElement = buttonElement;
    this.buttonElement.addEventListener("click", this.roll.bind(this));
    wrapperElement.addEventListener("click", this.roll.bind(this));
    this.diceThree = new DiceThree(wrapperElement)
  }

  private async roll() {
    this.buttonElement.disabled = true;
    await this.diceThree.roll();
    this.buttonElement.disabled = false;
  }
}

export default Dice;
