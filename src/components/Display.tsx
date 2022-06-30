import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import theme from '../data/theme';
import Lowpoly from '../lib/Lowpoly';
// import { Tracker } from '../utils/helpers';

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
  box-shadow: 0 2px 5px ${rgba('#000', 0.2)}, 0 5px 20px ${rgba('#000', 0.1)};
`;

const Display = ({ settings, updateOutput }) => {
  // const [perf] = useState(new Tracker());
  const canvas = useRef(null);

  /**
   * Draw the source gradient or image
   * @param {CanvasRenderingContext2D} context Canvas context
   * @param {HTMLCanvasElement} elem Canvas element
   */
  const drawCanvas = async (elem: HTMLCanvasElement) => {
    const { geometry, colour, image, useImage } = settings;
    const cvs = new Lowpoly(elem);

    const dataURL = await cvs.render({
      variance: geometry.variance,
      cellSize: geometry.cellSize,
      depth: geometry.depth,
      dither: geometry.dither,
      image,
      colours: colour,
      useImage,
    });

    updateOutput(dataURL);
  };

  useEffect(() => {
    drawCanvas(canvas.current);
    // console.log(settings);
  }, [settings]);

  const { width, height } = settings.dimensions;

  return (
    <StyledDisplay>
      <Canvas ref={canvas} width={width} height={height} />
    </StyledDisplay>
  );
};

Display.propTypes = {
  settings: PropTypes.object.isRequired,
  updateOutput: PropTypes.func.isRequired,
};

export default Display;
