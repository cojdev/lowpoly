import { rgba } from 'polished';
import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const StyledLoader = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  border: 8px solid transparent;
  border-left-color: ${rgba('white', 0.4)};
  animation: ${spin} 600ms linear infinite;
`;

const Loader: FC = () => (
  <StyledLoader>
    <Spinner />
  </StyledLoader>
);

export default Loader;
