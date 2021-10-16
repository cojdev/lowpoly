import React from 'react';
import styled from 'styled-components';
import { topbar } from '../data/theme';

const StyledHeader = styled.header`
  background-color: #fbfbfb;
  padding: 1rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 900;
    color: #e24;
    margin: 0;
    line-height: ${topbar.height};
  }
`;

const Header = () => (
  <StyledHeader>
    <h1>LowPoly Generator</h1>
    <p>
      Create lowpoly images free to use in personal and commercial projects.
    </p>
    <a
      className="github-button"
      href="https://github.com/cojdev/lowpoly"
      data-icon="octicon-star"
      data-show-count="true"
      aria-label="Star cojdev/lowpoly on GitHub">
      Star
    </a>
  </StyledHeader>
);

export default Header;
