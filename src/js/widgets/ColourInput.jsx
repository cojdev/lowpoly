import React from 'react';
import styled, { css } from 'styled-components';
import { hslToCss } from '../common/colour';

const StyledColourInput = styled.div.attrs((props) => ({
  style: {
    backgroundColor: hslToCss(...props.colour) || '#fff',
  },
}))`
  display: block;
  position: relative;
  margin: 0;

  flex-grow: 1;
  height: 100%;
  width: 100%;
  cursor: pointer;
  outline: none;
  position: relative;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:only-child {
    border-radius: 4px;
  }

  ${(props) =>
    props.active &&
    css`
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transform: scale(1.1);
      z-index: 5;
      border-radius: 4px;
      transition: 150ms ease;
      transition-property: box-shadow border-radius z-index transform;

      &:first-child,
      &:last-child {
        border-radius: 4px;
      }
    `}
`;

const ColourInput = (props) => (
  <StyledColourInput
    active={props.active}
    colour={props.value}
    data-id={props.index}
    onClick={props.setActiveColour}
  />
);

export default ColourInput;
