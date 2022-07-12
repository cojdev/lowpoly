import { dot } from 'mathjs';
import { drawImageProp, normalise, wait } from '../utils/helpers';
import { hslToCss } from '../services/colour';
import Triangle from './Triangle';
import { SettingsState } from '../data/defaults';
import { HSLColour } from '../utils/types';
import PRNG from './PRNG';
import Tracker from './Tracker';
import Vector from './Vector';
import Vertex from './Vertex';

export default class Lowpoly {
  element: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  points: Vertex[];

  triangles: Triangle[];

  variance: number;

  cellSize: number;

  depth: number;

  image: SettingsState['image'];

  useImage: boolean;

  colours: HSLColour[];

  gridWidth: number;

  gridHeight: number;

  columnCount: number;

  rowCount: number;

  imageData: any;

  dataUrl: string;

  dither: number;

  light: Vector;

  seed: number;

  PRNG: PRNG;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = this.element.getContext('2d');
    this.points = [];
    this.triangles = [];

    // options
    this.variance = 4;
    this.cellSize = 50;
    this.depth = 0;
    this.dither = 0;

    this.image = null;
    this.useImage = false;

    this.colours = [];

    this.gridWidth = 0;
    this.gridHeight = 0;

    this.columnCount = 0;
    this.rowCount = 0;

    // light source direction
    this.light = new Vector([0.5, 0.5, 1.5]);
    this.light.normalise();

    this.seed = 0;
    this.PRNG = new PRNG(this.seed);

    this.ctx.strokeStyle = '#fff';
  }

  drawTriangle(vertices: Vertex[]) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    ctx.lineTo(vertices[1].x, vertices[1].y);
    ctx.lineTo(vertices[2].x, vertices[2].y);
    ctx.closePath();
    ctx.fill();
  }

  drawBackground() {
    const { ctx, element, colours } = this;

    ctx.clearRect(0, 0, element.width, element.height);

    // using an image
    if (this.image.src && this.useImage) {
      const baseImage = new Image();
      baseImage.crossOrigin = 'Anonymous';
      baseImage.src = this.image.src;

      return new Promise<void>((resolve) => {
        baseImage.onload = () => {
          // drawImageProp simulates background-size: cover
          drawImageProp(ctx, baseImage);
          resolve();
        };
      });
    }
    // using a gradient
    ctx.globalCompositeOperation = 'multiply';

    const gradient = ctx.createLinearGradient(
      0,
      0,
      element.width,
      element.height
    );

    // loop colours and create gradient
    for (let i = 0; i < colours.length; i++) {
      if (colours.length > 1) {
        gradient.addColorStop(
          i / (colours.length - 1),
          hslToCss(...colours[i])
        );
        // draw gradient on element
        ctx.fillStyle = gradient;
      } else {
        // use a single colour
        ctx.fillStyle = hslToCss(...colours[i]);
      }
    }

    ctx.beginPath();
    ctx.fillRect(0, 0, element.width, element.height);
    ctx.closePath();
    ctx.fill();

    // draw gradient overlay
    const overlay = ctx.createLinearGradient(0, 0, 0, element.height);
    overlay.addColorStop(0, '#fff');
    overlay.addColorStop(1, '#ccc');

    ctx.beginPath();
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, element.width, element.height);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  drawPoly(tri: Triangle) {
    const { element, ctx, dither } = this;
    const centre = tri.getCentre();

    const ditherX = (dither / 200) * element.width;
    const ditherY = (dither / 200) * element.height;

    centre.x += this.PRNG.generate() * ditherX - ditherX / 2;
    centre.y += this.PRNG.generate() * ditherY - ditherY / 2;

    // boundaries
    if (centre.x < 0) centre.x = 0;
    if (centre.x > element.width - 1) centre.x = element.width - 1;
    if (centre.y < 0) centre.y = 0;
    if (centre.y > element.height - 1) centre.y = element.height - 1;

    const pixel =
      (Math.floor(centre.x) + Math.floor(centre.y) * element.width) * 4;

    // values 0-255
    const [red, green, blue, alpha] = [
      this.imageData[pixel],
      this.imageData[pixel + 1],
      this.imageData[pixel + 2],
      this.imageData[pixel + 3],
    ];

    // shadows and highlights
    const normal = tri.getNormal();
    const shadow = Math.min(
      1.1 * normalise(dot(this.light.coords, normal.coords), 1, -1),
      1
    );
    const specular = Math.max(
      1 - 1.5 * normalise(dot(this.light.coords, normal.coords), 1, -1),
      0
    );

    const r = (1 - (1 - normalise(red, 255)) * (1 - specular)) * shadow;
    const g = (1 - (1 - normalise(green, 255)) * (1 - specular)) * shadow;
    const b = (1 - (1 - normalise(blue, 255)) * (1 - specular)) * shadow;

    // console.log(shadow);

    ctx.fillStyle = `rgba(
      ${Math.round(r * 255)},
      ${Math.round(g * 255)},
      ${Math.round(b * 255)},
      ${alpha / 255}
    )`;

    // ctx.fillStyle = `rgba(
    //   ${Math.round((red * shadow) / 255)},
    //   ${Math.round((green * shadow) / 255)},
    //   ${Math.round((blue * shadow) / 255)},
    //   ${alpha / 255}
    // )`;

    // ctx.fillStyle = `rgba(
    //   ${Math.round(specular)},
    //   ${Math.round(specular)},
    //   ${Math.round(specular)},
    //   ${alpha / 255}
    // )`;

    // ctx.fillStyle = `rgba(
    //   ${Math.round(shadow * 255)},
    //   ${Math.round(shadow * 255)},
    //   ${Math.round(shadow * 255)},
    //   ${alpha / 255}
    // )`;

    this.drawTriangle(tri.vertices);
  }

  generatePoints() {
    const { rowCount, columnCount, cellSize, variance, depth } = this;
    const ret = [];

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        const vert = new Vertex();

        // get y position and add variance
        vert.y = i * cellSize * 0.866 - cellSize;
        vert.y += (this.PRNG.generate() - 0.5) * variance * cellSize * 2;

        // even rows
        if (i % 2 === 0) {
          vert.x = j * cellSize - cellSize;
          vert.x += (this.PRNG.generate() - 0.5) * variance * cellSize * 2;
        } else {
          // odd rows
          vert.x = j * cellSize - cellSize + cellSize / 2;
          vert.x += (this.PRNG.generate() - 0.5) * variance * cellSize * 2;
        }

        vert.z = (this.PRNG.generate() * depth * cellSize) / 50;

        ret.push(vert);
      }
    }

    this.points = ret;
  }

  generateTriangles() {
    const { points, rowCount, columnCount } = this;

    const ret = [];

    for (let i = 0; i < points.length; i++) {
      const currentRow = Math.floor(i / columnCount);

      // don't add squares/triangles to the end of a row
      if (
        i % columnCount !== columnCount - 1 &&
        i < (rowCount - 1) * columnCount
      ) {
        const square = [
          points[i],
          points[i + 1],
          points[columnCount + i + 1],
          points[columnCount + i],
        ];

        let tri1: Triangle;
        let tri2: Triangle;

        // create two triangles from the square, alternate direction on rows to tile correctly
        if (currentRow % 2 !== 0) {
          tri1 = new Triangle([square[0], square[2], square[3]]);
          tri2 = new Triangle([square[0], square[1], square[2]]);
        } else {
          tri1 = new Triangle([square[0], square[1], square[3]]);
          tri2 = new Triangle([square[1], square[2], square[3]]);
        }

        ret.push(tri1, tri2);
      }
    }

    this.triangles = ret;
  }

  async render(options: {
    variance: number;
    cellSize: number;
    depth: number;
    dither: number;
    image: any;
    colours: any;
    useImage: boolean;
    seed: number;
  }) {
    await wait(0);
    Object.assign(this, options);

    this.PRNG.reset(this.seed);
    const tracker = new Tracker();

    this.cellSize = this.cellSize * 3 + 30;
    this.variance /= 100;

    this.gridWidth = this.element.width + this.cellSize * 2;
    this.gridHeight = this.element.height + this.cellSize * 2;

    this.columnCount = Math.ceil(this.gridWidth / this.cellSize) + 2;
    this.rowCount = Math.ceil(this.gridHeight / (this.cellSize * 0.865));

    tracker.test(() => this.generatePoints(), 'generatePoints');
    tracker.test(() => this.generateTriangles(), 'generateTriangles');

    const { element, ctx, triangles } = this;

    ctx.clearRect(0, 0, element.width, element.height);

    // draw gradient/image on canvas and get image data
    await tracker.test(() => this.drawBackground(), 'drawBackground', true);

    tracker.test(() => {
      this.imageData = ctx.getImageData(
        0,
        0,
        element.width,
        element.height
      ).data;
    }, 'getImageData');

    // draw polys on main canvas
    tracker.test(() => {
      for (let i = 0; i < triangles.length; i++) {
        this.drawPoly(triangles[i]);
      }
    }, 'drawPoly');

    // tracker.log();

    // generate data url of image
    this.dataUrl = element.toDataURL();

    return this.dataUrl;
  }
}
