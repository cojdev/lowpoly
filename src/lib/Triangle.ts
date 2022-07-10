import { cross } from 'mathjs';
import { vectorFromVertices } from '../utils/helpers';
import Vector from './Vector';
import Vertex from './Vertex';

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
