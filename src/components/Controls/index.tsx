import React, { FC, useContext } from 'react';
import styled, { css } from 'styled-components';
import theme from '../../data/theme';

import DimensionControls from './DimensionControls';
import GeometryControls from './GeometryControls';
import ColourControls from './ColourControls';
import Header from '../Header';
import ControlGroup from './ControlGroup';
import ImageControls from './ImageControls';
import PaletteControls from './PaletteControls';
import LinkButton from '../ui/LinkButton';
import useDispatch from '../../hooks/useDispatch';
import StateContext from '../../context/StateContext';

const Container = styled.section`
  padding: 0;
  display: flex;

  @media screen and (min-width: 800px) {
    margin-left: calc(100% - ${theme.controls.width});
  }
`;

const ButtonWrap = styled.div`
  width: 5rem;
  padding: 1rem;
  display: flex;
  align-items: flex-end;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const ToggleButton = styled.button`
  display: block;
  height: 3rem;
  width: 3rem;
  padding: 0rem;
  margin: 0;
  border: none;
  border-radius: 100px;
  box-shadow: ${theme.shadow};
  background-color: #fff;
  cursor: pointer;
  transition: ${theme.controls.transition};

  img {
    width: 1rem;
    vertical-align: middle;
    height: auto;
  }

  ${(props: { open: boolean }) =>
    props.open &&
    css`
      transform: translateX(62%);
    `}
`;

const StyledControls = styled.section<{ open: boolean }>`
  min-height: 100vh;
  color: #444;
  background-color: #fff;
  width: ${theme.controls.width};
  max-width: calc(100vw - 2.5rem);
  padding: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  z-index: 2;

  @media screen and (min-width: 800px) {
    max-width: 100%;
    box-shadow: none;
  }

  @media screen and (max-width: 800px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    transform: translateX(calc(100% - 5rem));
    transition: transform ${theme.controls.transition};

    ${(props) =>
      props.open &&
      css`
        transform: none;
      `}
  }
`;

const DownloadButton = styled(LinkButton)``;

const FileMetadata = styled.p`
  text-align: center;
`;

const Footer = styled.footer`
  color: #888;
  width: 100%;
  font-size: 0.8em;
  text-align: center;
  padding: 2em 0;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
  }

  li:not(:last-child) {
    :after {
      content: ' •';
      margin: 0 0.5rem;
      color: #ddd;
    }
  }
`;

const Controls: FC<{
  className?: string;
  output: any;
  open: any;
}> = ({ className, output, open }) => {
  const { settings } = useContext(StateContext);

  const dispatch = useDispatch();
  const head = 'data:image/png;base64,';

  const kb = 1024;
  const mb = kb * kb;

  const getFileSize = (raw = false) => {
    const size = Math.round(((output.length - head.length) * 3) / 4);
    if (raw) {
      return size;
    }

    if (size > mb) {
      return `${(size / mb).toFixed(2)}MB`;
    }
    if (size > kb) {
      return `${(size / kb).toFixed(1)}KB`;
    }
    return `${size.toFixed(1)}B`;
  };

  return (
    <Container className={className}>
      <ButtonWrap>
        <ToggleButton
          onClick={() => {
            dispatch({ type: 'TOGGLE_CONTROLS' });
          }}
          open={open}>
          <img src={open ? 'assets/x.svg' : 'assets/menu.svg'} />
        </ToggleButton>
      </ButtonWrap>
      <StyledControls open={open}>
        <Header />
        <DimensionControls />
        <ImageControls />
        <GeometryControls />
        <ColourControls />
        <PaletteControls />
        <ControlGroup title="Export">
          <DownloadButton href={output} download="lowpoly.png">
            Download PNG
          </DownloadButton>
          <FileMetadata>
            {getFileSize()} &bull; {settings.dimensions.width}&times;
            {settings.dimensions.height}
          </FileMetadata>
        </ControlGroup>
        <Footer>
          by{' '}
          <a href="https://cojdev.github.io" target="_top">
            Charles Ojukwu
          </a>
          <ul>
            <li>
              <a href="https://github.com/cojdev">Github</a>
            </li>
            <li>
              <a href="https://codepen.io/cojdev">CodePen</a>
            </li>
          </ul>
        </Footer>
      </StyledControls>
    </Container>
  );
};

export default Controls;
