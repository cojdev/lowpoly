import { cross } from 'mathjs';

export class Vertex {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Vector {
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

export const vectorFromVertices = (vertices: [Vertex, Vertex]): Vector => {
  return new Vector([
    vertices[1].x - vertices[0].x,
    vertices[1].y - vertices[0].y,
    vertices[1].z - vertices[0].z,
  ]);
};

export default class Triangle {
  vertices: [Vertex, Vertex, Vertex];

  constructor(vertices: [Vertex, Vertex, Vertex]) {
    this.vertices = vertices;
  }

  getCentre() {
    const { vertices } = this;
    const x = (vertices[0].x + vertices[1].x + vertices[2].x) / 3;
    const y = (vertices[0].y + vertices[1].y + vertices[2].y) / 3;
    return { x, y };
  }

  getNormal() {
    const { vertices } = this;

    const v1 = vectorFromVertices([vertices[0], vertices[1]]).coords;
    const v2 = vectorFromVertices([vertices[0], vertices[2]]).coords;

    const normal = new Vector(cross(v1, v2) as number[]);

    normal.normalise();

    return normal;
  }
}
