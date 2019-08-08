import React from 'react';
import styled from 'styled-components';
import { callbackify } from 'util';
import theme from './common/theme';
import drawCanvas from './common/canvas';
import Lowpoly from './Lowpoly';

const StyledDisplay = styled.div`
  text-align: center;
  bottom: 0;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 100%;

  @media screen and (min-width: 800px) {
    width: calc(100% - ${theme.controls.width});
  }
`;

const Canvas = styled.canvas`
  max-width: 100%;
  max-height: 100%;
  box-shadow:
    0 2px 5px rgba(hexToRgb(#000), .2),
    0 5px 20px rgba(hexToRgb(#000), .1);
`;

export default class Display extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas1;

    this.refs.loader.style.display = 'none';

    this.drawCanvas(canvas);
  }

  componentDidUpdate(previousProps, previousState) {
    const canvas = this.refs.canvas1;
    const self = this;

    if (previousProps.settings !== this.props.settings) {
      self.refs.loader.style.display = 'flex';

      // const draw =
      window.setTimeout(this.drawCanvas.bind(this, canvas, () => {
        self.refs.loader.style.display = 'none';
      }), 5);
    }
  }

  /**
   * Draw the source gradient or image
   * @param {CanvasRenderingContext2D} context Canvas context
   * @param {HTMLCanvasElement} canvas Canvas element
   */
  drawCanvas(canvas, callback = () => null) {
    // drawCanvas.call(this, canvas, canvas2, callback);
    const {
      geometry, colour, image, useImage,
    } = this.props.settings;
    const canv = new Lowpoly(canvas);
    canv.render({
      variance: geometry.variance,
      cellSize: geometry.cellSize,
      depth: geometry.depth,
      dither: geometry.dither,
      image,
      colours: colour,
      useImage,
    }, (dataURL) => {
      this.props.updateOutput(dataURL);
    });
    callback();
  }

  render() {
    const { width, height } = this.props.settings.dimensions;

    return (
      <StyledDisplay>
        <div
          className='loader'
          ref='loader'>
          <div
            className="spinner"></div>
        </div>
        <Canvas
          ref="canvas1"
          width={width}
          height={height} />
      </StyledDisplay>
    );
  }
}
