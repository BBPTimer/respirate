export default class Pet {
  constructor(name, targetRate) {
    this.name = name;
    this.targetRate = targetRate;
    this.rateHistory = [];
  }
}
