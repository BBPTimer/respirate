export default class Pet {
  constructor(name, vet) {
    this.name = name;
    this.vet = vet;
    this.targetRate = 30;
    this.rateHistory = [];
  }
}
