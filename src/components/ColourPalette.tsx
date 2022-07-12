import React, { FC } from 'react';
import styled from 'styled-components';
import { HSLColour } from '../utils/types';
import { hslToCss } from '../services/colour';

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

const Colour = styled.div<{ background: HSLColour }>`
  flex-grow: 1;
  height: 100%;
  background-color: ${({ background }) => hslToCss(...background) || '#ccc'};
`;

const ColourPalette: FC<{
  colours: HSLColour[];
  handleSetPalette: (a: HSLColour[]) => void;
}> = ({ colours, handleSetPalette }) => (
  <Palette onClick={() => handleSetPalette(colours)}>
    {colours.map((item, index) => (
      <Colour key={index} background={item} />
    ))}
  </Palette>
);

export default ColourPalette;
