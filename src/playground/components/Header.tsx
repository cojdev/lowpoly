import React, { FC } from 'react';
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

const Header: FC = () => (
  <StyledHeader>
    <h1>LowPoly Generator</h1>
    <a
      className="github-button"
      href="https://github.com/cojdev/lowpoly"
      data-icon="octicon-star"
      data-show-count="true"
      aria-label="Star cojdev/lowpoly on GitHub">
      Star
    </a>
    <p>
      Create lowpoly images free to use in personal and commercial projects.
    </p>

    <a href="https://ko-fi.com/Y8Y829JJM" target="_blank">
      <img
        height="36"
        style={{ border: '0px', height: '36px' }}
        src="https://cdn.ko-fi.com/cdn/kofi1.png?v=3"
        alt="Buy Me a Coffee at ko-fi.com"
      />
    </a>
  </StyledHeader>
);

export default Header;
