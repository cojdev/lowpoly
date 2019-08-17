import { css } from 'styled-components';
import { colours } from '../common/theme';


export const button = css`
  color: #fff;
  padding: calc(1ch + 2px);
  border: none;
  font-size: 1rem;
  font-weight: bold;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  transition: 150ms ease;
  display: block;
  width: 100%;
  background-color: ${colours.primary};
  border-radius: 3px;
  cursor: pointer;

  :hover {
    box-shadow: none;
  }

  :active {
    box-shadow: inset 0 2px 10px rgba(0,0,0,.06);
  }
    
  :disabled {
    cursor: not-allowed;
  }
`;

export default { button };
