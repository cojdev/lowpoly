import styled from 'styled-components';
import { rowCSS, columnCSS } from './generic';

export const Row = styled.div`
  ${rowCSS};
`;

export const Column = styled.div<{width?: number}>`
  ${columnCSS};
  width: calc(${(props) => props.width * 100 || 50}% - 0.5rem);
`;
