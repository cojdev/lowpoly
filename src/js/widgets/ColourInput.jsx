import React from 'react';
import styled, { css } from 'styled-components';
import { hslToCss } from '../common/colour';

const StyledColourInput = styled.div.attrs(props => ({
  style: {
    backgroundColor: hslToCss(...props.colour) || '#fff',
    padding: '3px',
  },
}))`
  display: block;
  position: relative;
  margin: 0;
  
  flex-grow: 1;
  height: 100%;
  width: 100%;
  transition: 150ms ease;
  cursor: pointer;
  outline: none;
  position: relative;
  /* background-color: ${props => props.colour}; */

  :first-child {
    border-radius: 4px 0 0 4px;
  }

  :last-child {
    border-radius: 0 4px 4px 0;
  }

  ${props => props.active && css`
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transform: scale(1.1);
    z-index: 5;
    border-radius: 4px;

    :first-child,
    :last-child {
      border-radius: 4px;
    }
  `}
`;

const ColourInput = props => (
  <StyledColourInput
    active={props.active}
    colour={props.value}
    data-id={props.index}
    onClick={props.setActiveColour} />
);

export default ColourInput;
