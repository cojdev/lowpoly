import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { buttonCSS } from '../../styles/generic';

export const StyledButton = styled.a`
  ${buttonCSS}
`;

const LinkButton = ({ children, ...rest }) => (
  <StyledButton {...rest}>{children}</StyledButton>
);

LinkButton.propTypes = {
  children: PropTypes.node,
};

export default LinkButton;
