import PropTypes from 'prop-types';
import React from 'react';
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

  ${(props) =>
    props.open &&
    css`
      transform: translateX(62%);
    `}
`;

const StyledControls = styled.section`
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
`;

const DownloadButton = styled(LinkButton)``;

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

const Controls = ({
  setDimensions,
  setColours,
  setImage,
  setUseImage,
  setGeometry,
  settings,
  presets,
  toggleControls,
  className,
  output,
  open,
}) => {
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
        <ToggleButton onClick={toggleControls} open={open}>
          <img src={open ? 'assets/x.svg' : 'assets/menu.svg'} />
        </ToggleButton>
      </ButtonWrap>
      <StyledControls>
        <Header />
        <DimensionControls
          settings={settings.dimensions}
          presets={presets}
          setDimensions={setDimensions}
        />
        <ImageControls
          settings={settings.image}
          useImage={settings.useImage}
          setImage={setImage}
          setUseImage={setUseImage}
          setDimensions={setDimensions}
        />
        <GeometryControls
          settings={settings.geometry}
          setGeometry={setGeometry}
        />
        <ColourControls settings={settings.colour} setColours={setColours} />
        <PaletteControls setColours={setColours} />
        <ControlGroup title="Export">
          <DownloadButton href={output} download="lowpoly.png">
            Download PNG
          </DownloadButton>
          <h3>File details</h3>
          Filesize: {getFileSize()}
          <br />
          Width: {settings.dimensions.width}
          <br />
          Height: {settings.dimensions.height}
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

Controls.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  output: PropTypes.string,
  presets: PropTypes.object,
  setColours: PropTypes.func,
  setDimensions: PropTypes.func,
  setGeometry: PropTypes.func,
  setImage: PropTypes.func,
  setUseImage: PropTypes.func,
  settings: PropTypes.shape({
    colour: PropTypes.any,
    dimensions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    geometry: PropTypes.any,
    image: PropTypes.any,
    useImage: PropTypes.bool,
  }),
  toggleControls: PropTypes.func,
};

export default Controls;