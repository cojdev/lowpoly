import styled, { css } from 'styled-components';
import { fieldCSS } from './generic';
import { colours } from '../data/theme';

export const StyledTextField = styled.input.attrs({ type: 'text' })`
  ${fieldCSS};
`;

export const StyledNumberField = styled.input.attrs({ type: 'number' })`
  ${fieldCSS};
`;

export const StyledDropdown = styled.select`
  display: block;
  -webkit-appearance: none;
  width: 100%;
  background-color: #fff;
  border: 2px solid #eee;
  padding: 1ch;
  border-radius: 3px;
  transition: 150ms ease;
  outline: none;
  font-size: 0.9rem;
  font-family: inherit;

  ${(p) =>
    p.focus &&
    css`
      border-color: #e14;
    `};
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  + label {
    padding-left: 2rem;
    position: relative;
    cursor: pointer;

    &:before,
    &:after {
      content: '';
      position: absolute;
      display: block;
    }

    &:before {
      left: 0;
      height: 1.5rem;
      width: 1.5rem;
      border: 2px solid #eee;
      border-radius: 3px;
    }

    &:after {
      left: 4px;
      top: calc(0.375rem);
      width: calc(1.5rem - 8px);
      height: calc(0.75rem - 4px);
      border: 2px solid ${colours.primary};
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      transform-origin: center;
      opacity: 0;
    }
  }

  :checked + label {
    &:after {
      opacity: 1;
    }
  }
`;

export const RangeSlider = styled.input.attrs({ type: 'range' })`
  width: 100%;
`;

export const Label = styled.label`
  padding: 0 0.5ch;
  color: #888;
  font-size: 0.9em;
  font-weight: bold;
  background-color: #f8f8f8;
  font-weight: 700;
`;
