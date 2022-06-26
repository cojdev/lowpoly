import React from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
`;

const Spinner = styled.div``;

const Loader = () => (
  <StyledLoader>
    <Spinner />
  </StyledLoader>
);

export default Loader;
