import React, { AnchorHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { buttonCSS } from '../../styles/generic';

export const StyledButton = styled.a`
  ${buttonCSS}
`;

const LinkButton: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...rest
}) => <StyledButton {...rest}>{children}</StyledButton>;

export default LinkButton;
