import styled, { css } from 'styled-components';
import theme, { colours } from '../common/theme';
import { hexToRgb } from '../common/colour';

const field = css`
  /* display: block;
  width: 100%;
  height: 2rem;
  font-family: inherit;
  font-size: .9em;
  line-height: 2rem;
  padding: 0 1ch;
  background: #fff;
  border: none;
  margin-bottom: .75rem;
  border-radius: 100px;
  transition: 150ms ease;

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${theme.colours.primary}, 0 0 0 4px rgba(${hexToRgb(theme.colours.primary).join(', ')}, .1);
  } */
`;

export const TextField = styled.input.attrs({ type: 'text' })`
  ${field};
`;

export const NumberField = styled.input.attrs({ type: 'number' })`
  ${field};
`;

export const Dropdown = styled.select`
  ${field};
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  + label {
    padding-left: 1.5rem;
    position: relative;
    cursor: pointer;

    &:before, &:after {
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
      top: calc(.375rem);
      width: calc(1.5rem - 8px);
      height: calc(.75rem - 4px);
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
  padding: 0 .5ch;
  color: #888;
  font-size: 0.9em;
  font-weight: bold;
  background-color: #f8f8f8;
  font-weight: 700;
`;
