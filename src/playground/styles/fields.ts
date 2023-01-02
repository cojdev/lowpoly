import styled, { css } from 'styled-components';
import { fieldCSS } from './generic';
import { colours } from '../data/theme';

export const StyledTextField = styled.input.attrs({ type: 'text' })`
  ${fieldCSS};
`;

export const StyledNumberField = styled.input.attrs({ type: 'number' })`
  ${fieldCSS};
`;

export const StyledDropdown = styled.select<{ focus: boolean }>`
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

  ${({ focus }) =>
    focus &&
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
      left: 0.3rem;
      right: 0.3rem;
      top: 0.5rem;
      width: 0.9rem;
      height: 0.5rem;
      border: 4px solid ${colours.primary};
      border-top: none;
      border-right: none;
      transform: translateY(-2px) rotate(-45deg);
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
  font-weight: 800;
  background-color: #f8f8f8;
  font-weight: 700;
`;
