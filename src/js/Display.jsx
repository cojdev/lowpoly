import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import theme from './common/theme';
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
  box-shadow: 0 2px 5px rgba(hexToRgb(#000), 0.2),
    0 5px 20px rgba(hexToRgb(#000), 0.1);
`;

const Display = (props) => {
  const canvas = useRef(null);

  /**
   * Draw the source gradient or image
   * @param {CanvasRenderingContext2D} context Canvas context
   * @param {HTMLCanvasElement} elem Canvas element
   */
  const drawCanvas = (elem, callback = () => null) => {
    const { geometry, colour, image, useImage } = props.settings;
    const cvs = new Lowpoly(elem);
    cvs.render(
      {
        variance: geometry.variance,
        cellSize: geometry.cellSize,
        depth: geometry.depth,
        dither: geometry.dither,
        image,
        colours: colour,
        useImage,
      },
      (dataURL) => {
        props.updateOutput(dataURL);
      }
    );
    callback();
  };

  useEffect(() => {
    drawCanvas(canvas.current);
  }, [props.settings]);

  const { width, height } = props.settings.dimensions;

  return (
    <StyledDisplay>
      <Canvas ref={canvas} width={width} height={height} />
    </StyledDisplay>
  );
};

export default Display;
