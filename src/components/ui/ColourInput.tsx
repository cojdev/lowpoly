import React, { FC, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { HSLColour } from '../../utils/types';
import { hslToCss } from '../../services/colour';

const StyledColourInput = styled.div.attrs<{ colour: HSLColour }>(
  ({ colour }) => ({
    style: {
      backgroundColor: hslToCss(...colour) || '#fff',
    },
  })
)<{ colour?: HSLColour; active?: boolean }>`
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

  ${({ active }) =>
    active &&
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

const ColourInput: FC<{
  active: boolean;
  index: string | number;
  setActiveColour: (e: MouseEvent<HTMLInputElement>) => void;
  value: HSLColour;
}> = ({ active, index, setActiveColour, value }) => (
  <StyledColourInput
    active={active}
    colour={value}
    data-id={index}
    onClick={setActiveColour}
  />
);

export default ColourInput;
