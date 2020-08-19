import React from 'react';
import styled from 'styled-components';
import styles from '../common/styles';

export const StyledButton = styled.a`
  ${styles.button}
`;

const LinkButton = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default LinkButton;
