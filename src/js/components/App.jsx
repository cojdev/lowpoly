import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// Components
import Display from './Display';
import Controls from './Controls';

// Helpers
import presets from '../data/presets';
import theme from '../data/theme';
import defaults from '../data/defaults';

const GlobalStyles = createGlobalStyle`
    *,*::before,*::after {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    html {
      font-family: ${theme.fonts.base};
      color: #333;
      background: #f6f6f6;
      font-size: 16px;
    }

    a {
      color: #48b;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }

    button {
      outline: none !important;
      font-family: inherit;
    }

    input {
      font-family: inherit;
    }
`;

const Container = styled.div``;

const StyledControls = styled(Controls)`
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

const App = () => {
  const [state, setState] = useState({
    // default controls values
    settings: { ...defaults },
    output: '',
    controlsOpen: false,
  });

  const { settings, output } = state;

  /**
   * Open and close the controls on mobile devices
   */
  const toggleControls = () => {
    setState({ ...state, controlsOpen: !state.controlsOpen });
  };

  /**
   * set dimensions of the image in pixels
   * @param {object} obj {width:Number, height:Number}
   */
  const setDimensions = (obj) => {
    const s = { ...state.settings };
    s.dimensions = obj;
    setState({ ...state, settings: s });
  };

  /**
   * sets the colours in the palette
   * @param {array} arr array of colour hex values
   */
  const setColours = (arr) => {
    const s = { ...state.settings };
    // console.log(arr);
    s.colour = arr;
    setState({ ...state, settings: s });
  };

  /**
   * set geometry
   * @param {number} option attribute being set
   * @param {number} value value
   */
  const setGeometry = (option, value) => {
    const s = { ...state.settings };
    s.geometry[option] = parseInt(value, 10);
    setState({ ...state, settings: s });
  };

  /**
   * Sets the selected image
   * @param {string} image url for specified image
   */
  const setImage = (image) => {
    const s = { ...state.settings };
    s.image = image;
    s.useImage = true;
    setState({ ...state, settings: s });
  };

  /**
   * Toggle using uploaded image in generated picture
   * @param {boolean} boolean
   */
  const setUseImage = (boolean) => {
    const s = { ...state.settings };
    s.useImage = boolean;
    setState({ ...state, settings: s });
  };

  /**
   * Updates the output dataURI in state
   * @param {string} value The data URL for the generated canvas
   */
  const updateOutput = (value) => {
    setState({ ...state, output: value });
  };

  // methods for setting application state
  const setters = {
    setDimensions,
    setColours,
    setGeometry,
    setImage,
    setUseImage,
  };

  return (
    <Container>
      <GlobalStyles />
      <Display settings={settings} updateOutput={updateOutput} />
      <StyledControls
        settings={settings}
        presets={presets.dimensions}
        output={output}
        open={state.controlsOpen}
        toggleControls={toggleControls}
        {...setters}
      />
    </Container>
  );
};

export default App;
