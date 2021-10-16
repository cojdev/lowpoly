export default class Triangle {
  constructor(vertices) {
    this.vertices = vertices;
  }

  getCentre() {
    const { vertices } = this;
    const x = (vertices[0].x + vertices[1].x + vertices[2].x) / 3;
    const y = (vertices[0].y + vertices[1].y + vertices[2].y) / 3;
    return { x, y };
  }
}
