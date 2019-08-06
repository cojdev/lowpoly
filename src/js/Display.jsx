import React from 'react';
import styled from 'styled-components';
import theme from './common/theme';
import drawCanvas from './common/canvas';

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

const HiddenCanvas = styled.canvas`
  display: none;
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
    const canvas2 = this.refs.canvas2;

    this.refs.loader.style.display = 'none';

    this.drawCanvas(canvas, canvas2);
  }

  componentDidUpdate(previousProps, previousState) {
    const canvas = this.refs.canvas1;
    const canvas2 = this.refs.canvas2;
    const self = this;

    if (previousProps.settings !== this.props.settings) {
      self.refs.loader.style.display = 'flex';

      // const draw =
      window.setTimeout(this.drawCanvas.bind(this, canvas, canvas2, () => {
        self.refs.loader.style.display = 'none';
      }), 5);
    }
  }

  /**
   * Draw the source gradient or image
   * @param {CanvasRenderingContext2D} context Canvas context
   * @param {HTMLCanvasElement} canvas Canvas element
   */
  drawCanvas(canvas, canvas2, callback) {
    drawCanvas.call(this, canvas, canvas2, callback);
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
        <HiddenCanvas
          ref="canvas2"
          width={width}
          height={height} />
      </StyledDisplay>
    );
  }
}
