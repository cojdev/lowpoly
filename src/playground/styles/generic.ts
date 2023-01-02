import { rgba } from 'polished';
import { css } from 'styled-components';
import { colours } from '../data/theme';

export const buttonCSS = css`
  color: #fff;
  padding: 1ch 1em;
  border: none;
  font-size: 0.8rem;
  font-weight: 800;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  transition: 150ms ease;
  display: block;
  width: 100%;
  background-color: ${colours.primary};
  border-radius: 100px;
  box-shadow: 0 5px 10px ${rgba('black', 0.1)};
  cursor: pointer;

  :hover {
    box-shadow: none;
  }

  :active {
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.06);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export const rowCSS = css`
  margin: 0 -0.25rem;
  display: flex;
  flex-wrap: wrap;
`;

export const columnCSS = css`
  display: block;
  margin: 0 0.25rem;
`;

export const fieldCSS = css<{ focus: boolean }>`
  display: block;
  -webkit-appearance: none;
  width: 100%;
  border: 2px solid #eee;
  padding: 1ch;
  border-radius: 3px;
  transition: 150ms ease;
  outline: none;
  font-size: 0.9rem;
  font-family: inherit;
  margin: 1em 0;

  ${({ focus }) =>
    focus &&
    css`
      border-color: #e14;
    `};
`;
