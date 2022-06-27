import PropTypes from 'prop-types';
import React, { FC } from 'react';
import styled from 'styled-components';
import { hslToCss } from '../utils/colour';

const Palette = styled.div`
  display: flex;
  position: relative;
  margin: 0 0 0.5em;
  cursor: pointer;
  outline: none;
  height: 24px;
  border-radius: 3px;
  overflow: hidden;

  :last-child {
    margin: 0;
  }
`;

const Colour = styled.div<{background: number[]}>`
  flex-grow: 1;
  height: 100%;
  background-color: ${({background}) => hslToCss(...background) || '#ccc'};
`;

const ColourPalette: FC<{colours: number[][]; handleSetPalette: (a: number[][]) => void}> = ({ colours, handleSetPalette }) => (
  <Palette onClick={() => handleSetPalette(colours)}>
    {colours.map((item, index) => (
      <Colour key={index} background={item} />
    ))}
  </Palette>
);

ColourPalette.propTypes = {
  colours: PropTypes.array,
  handleSetPalette: PropTypes.func,
};

export default ColourPalette;
