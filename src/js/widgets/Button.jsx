import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { buttonCSS } from '../common/styles';

export const StyledButton = styled.button`
  ${buttonCSS}
`;

const Button = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
