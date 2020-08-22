import React from 'react';
import styled from 'styled-components';
import { hslToCss } from '../common/colour';

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

const Colour = styled.div`
  flex-grow: 1;
  height: 100%;
  background-color: ${(props) => hslToCss(...props.background) || '#ccc'};
`;

const ColourPalette = (props) => (
  <Palette onClick={() => props.handleSetPalette(props.colours)}>
    {props.colours.map((item, index) => (
      <Colour key={index} background={item} />
    ))}
  </Palette>
);

export default ColourPalette;
