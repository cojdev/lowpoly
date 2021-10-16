import { css } from 'styled-components';
import { colours } from '../data/theme';

const CallToAction = css`
  display: inline-block;
  text-decoration: none;
  background: linear-gradient(
    to bottom left,
    ${colours.primary},
    ${colours.secondary}
  );
  border: none;
  padding: 0.6rem;
  color: #fff;
  text-align: center;
  border-radius: 100px;
  width: 100%;

  font-size: 1em;

  :hover {
    /* background: #eee; */
  }

  [disabled] {
    cursor: not-allowed;
  }
`;

export default CallToAction;
