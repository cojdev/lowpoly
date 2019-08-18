import styled from 'styled-components';
import { row, column } from './styles';

export const Row = styled.div`
  ${row};
`;

export const Column = styled.div`
  ${column};
  width: calc(${props => props.width * 100 || 50}% - .5rem);
`;
