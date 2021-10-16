import styled from 'styled-components';
import { rowCSS, columnCSS } from './styles';

export const Row = styled.div`
  ${rowCSS};
`;

export const Column = styled.div`
  ${columnCSS};
  width: calc(${(props) => props.width * 100 || 50}% - 0.5rem);
`;
