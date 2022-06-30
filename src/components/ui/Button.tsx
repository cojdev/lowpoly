import PropTypes from 'prop-types';
import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { buttonCSS } from '../../styles/generic';

export const StyledButton = styled.button`
  ${buttonCSS}
`;

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => <StyledButton {...rest}>{children}</StyledButton>;

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
