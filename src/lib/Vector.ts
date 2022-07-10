export default class Vector {
  coords: number[];

  constructor(coords: number[]) {
    this.coords = coords;
  }

  getLength(): number {
    const { coords } = this;
    return Math.sqrt(coords[0] ** 2 + coords[1] ** 2 + coords[2] ** 2);
  }

  normalise() {
    const length = this.getLength();
    this.coords = this.coords.map((item) => item / length);
  }
}
