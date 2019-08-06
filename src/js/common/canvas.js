import { hexToRgb, hslToCss } from './colour';
import { drawImageProp } from './helpers';

/**
 * Draw the source gradient or image
 * @param {CanvasRenderingContext2D} context Canvas context
 * @param {HTMLCanvasElement} canvas Canvas element
 */
export default function drawCanvas(canvas, canvas2, callback) {
  const { geometry } = this.props.settings;

  const self = this;

  let imgd;
  const cRange = { value: geometry.cellSize };
  const vRange = { value: geometry.variance };
  const oAmount = { value: geometry.depth / 2 };
  const cvs = canvas;
  const ctx = cvs.getContext('2d');

  const cellSize = (cRange.value * 3) + 30;
  const variance = vRange.value / 100;
  const depth = oAmount.value / 100;

  const gridWidth = cvs.width + cellSize * 2;
  const gridHeight = cvs.height + cellSize * 2;
  const maxCols = Math.ceil(gridWidth / cellSize) + 2;
  const maxRows = Math.ceil(gridHeight / (cellSize * 0.865));

  const x = maxCols;
  const y = maxRows;

  const drawBG = (context, canvas, hidden, callback) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // using an image
    if (this.props.settings.image && this.props.settings.useImage) {
      const baseImage = new Image();
      baseImage.crossOrigin = 'Anonymous';
      baseImage.src = this.props.settings.image;

      baseImage.onload = function () {
        // use image instead of gradient
        // drawImageProp simulates background-size: cover
        drawImageProp(context, baseImage);
        callback();
      };
    } else {
      // using a gradient
      context.globalCompositeOperation = 'multiply';

      // colours
      const inputs = self.props.settings.colour;

      // loop colours and create gradient
      let gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < inputs.length; i++) {
        if (inputs.length > 1) {
          gradient.addColorStop(
            i / (inputs.length - 1),
            hslToCss(...inputs[i]),
          );
        } else {
          gradient = inputs[i];
        }
      }

      // draw gradient on canvas
      context.fillStyle = gradient;
      context.beginPath();
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
      context.fill();

      // draw subtle gradient overlay
      context.beginPath();
      const overlay = context.createLinearGradient(0, 0, 0, cvs.height);
      overlay.addColorStop(0, '#fff');
      overlay.addColorStop(1, '#ccc');
      context.fillStyle = overlay;
      context.fillRect(0, 0, cvs.width, cvs.height);
      context.closePath();
      context.fill();
      context.globalCompositeOperation = 'source-over';
    }

    // check context is of the defined hidden canvas
    if (hidden) { imgd = context; }
  };

  // generate a grid of point objects
  const generatePoints = (amount) => {
    const points = [];
    let currentRow = 0;
    let currentColumn = 0;

    // loop all points
    for (let i = 0; i < amount; i++) {
      const temp = {
        x: 0, y: 0, r: 0, c: 0,
      };

      // even rows
      if (currentRow % 2 === 0) {
        temp.x = (currentColumn * cellSize) - cellSize;
        temp.x += (Math.random() - 0.5) * variance * cellSize * 2;
      } else {
        // odd rows
        temp.x = (currentColumn * cellSize) - cellSize - (cellSize / 2);
        temp.x += (Math.random() - 0.5) * variance * cellSize * 2;
      }

      temp.y = (currentRow * cellSize * 0.866) - cellSize;
      temp.y += (Math.random() - 0.5) * variance * cellSize * 2;
      temp.r = currentRow;
      temp.c = currentColumn;

      points.push(temp);

      currentColumn += 1;

      if ((i + 1) % maxCols === 0) {
        currentRow += 1;
        currentColumn = 0;
      }
    }

    return points;
  };

  const points = generatePoints(x * y);

  const draw = (index) => {
    const setColour = function (x, y) {
      const pos = { x, y };

      // boundaries
      if (pos.x < 0) pos.x = 0;
      if (pos.x > cvs.width - 1) pos.x = cvs.width - 1;
      if (pos.y < 0) pos.y = 0;
      if (pos.y > cvs.height - 1) pos.y = cvs.height - 1;

      const [red, green, blue, alpha] = imgd.getImageData(pos.x, pos.y, 1, 1).data;

      const temp = (Math.random() * 2 * depth) - depth;
      ctx.fillStyle = `rgba(
        ${Math.round(red - red * temp)},
        ${Math.round(green - green * temp)},
        ${Math.round(blue - blue * temp)},
        ${alpha / 255}
      )`;
    };

    const currentPoint = points[index];

    // even rows
    if (
      currentPoint.r % 2 === 0
        && points[index + maxCols + 1]
        && currentPoint.c < maxCols - 1
    ) {
      setColour(
        Math.round(currentPoint.c / maxCols * gridWidth),
        Math.round(currentPoint.r / maxRows * gridHeight + 2 * cellSize / 3),
      );

      ctx.beginPath();
      ctx.moveTo(currentPoint.x, currentPoint.y);
      ctx.lineTo(points[index + maxCols].x, points[index + maxCols].y);
      ctx.lineTo(points[index + maxCols + 1].x, points[index + maxCols + 1].y);
      ctx.closePath();
      ctx.fill();

      setColour(
        Math.round(currentPoint.c / maxCols * gridWidth + cellSize / 2),
        Math.round(currentPoint.r / maxRows * gridHeight + cellSize / 3),
      );

      ctx.beginPath();
      ctx.moveTo(currentPoint.x, currentPoint.y);
      ctx.lineTo(points[index + 1].x, points[index + 1].y);
      ctx.lineTo(points[index + maxCols + 1].x, points[index + maxCols + 1].y);
      ctx.closePath();
      ctx.fill();
    }

    // odd rows
    if (
      currentPoint.r % 2 !== 0
        && points[index + maxCols + 1]
        && currentPoint.c > 0
    ) {
      setColour(
        Math.round((currentPoint.c - 1) / maxCols * gridWidth),
        Math.round(currentPoint.r / maxRows * gridHeight + cellSize / 3),
      );
      ctx.beginPath();
      ctx.moveTo(currentPoint.x, currentPoint.y);
      ctx.lineTo(points[index - 1].x, points[index - 1].y);
      ctx.lineTo(points[index + maxCols - 1].x, points[index + maxCols - 1].y);
      ctx.closePath();
      ctx.fill();

      setColour(
        Math.round((currentPoint.c - 1) / maxCols * gridWidth + cellSize / 2),
        Math.round(currentPoint.r / maxRows * gridHeight + 2 * cellSize / 3),
      );

      ctx.beginPath();
      ctx.moveTo(currentPoint.x, currentPoint.y);
      ctx.lineTo(points[index + maxCols - 1].x, points[index + maxCols - 1].y);
      ctx.lineTo(points[index + maxCols].x, points[index + maxCols].y);
      ctx.closePath();
      ctx.fill();
    }
  };

  // clear the canvas
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  // draw hidden canvas background
  drawBG(canvas2.getContext('2d'), canvas2, true);

  // draw background on main canvas
  drawBG(ctx, cvs, false);

  // draw polygons on main canvas
  for (let i = 0; i < points.length; i++) {
    draw(i, true);
  }

  // generate data url of image
  const outputDataURL = canvas.toDataURL();

  this.props.updateOutput(outputDataURL);

  if (callback) {
    callback();
  }
}
