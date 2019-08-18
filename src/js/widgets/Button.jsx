import React from 'react';
import styled from 'styled-components';
import styles from '../common/styles';

export const StyledButton = styled.button`
  ${styles.button}
`;

const Button = props => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default Button;
