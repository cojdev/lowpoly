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

export default Button;
