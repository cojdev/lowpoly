import React, { FC, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Components
import Display from './Display';
import Controls from './Controls';

// Helpers
import presets from '../data/presets';
import theme from '../data/theme';
import defaults, { SettingsState } from '../data/defaults';
import { Dimensions, HSLColour } from '../utils/types';

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

const App: FC = () => {
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
   * @param {object} obj
   */
  const setDimensions = (obj: Dimensions) => {
    const s = { ...state.settings };
    s.dimensions = obj;
    setState({ ...state, settings: s });
  };

  /**
   * sets the colours in the palette
   * @param {array} arr array of colour hex values
   */
  const setColours = (colours: HSLColour[]) => {
    const s = { ...state.settings };
    // console.log(arr);
    s.colour = colours;
    setState({ ...state, settings: s });
  };

  /**
   * set geometry
   * @param {string} option attribute being set
   * @param {number} value value
   */
  const setGeometry = (
    option: keyof SettingsState['geometry'],
    value: number
  ) => {
    const s = { ...state.settings };
    s.geometry[option] = value;
    setState({ ...state, settings: s });
  };

  /**
   * Sets the selected image
   * @param {string} image url for specified image
   */
  const setImage = (image: SettingsState['image']) => {
    const s = { ...state.settings };
    s.image = image;
    s.useImage = true;
    setState({ ...state, settings: s });
  };

  /**
   * Toggle using uploaded image in generated picture
   * @param {boolean} boolean
   */
  const setUseImage = (boolean: boolean) => {
    const s = { ...state.settings };
    s.useImage = boolean;
    setState({ ...state, settings: s });
  };

  /**
   * Updates the output dataURI in state
   * @param {string} value The data URL for the generated canvas
   */
  const updateOutput = (value: string) => {
    setState({ ...state, output: value });
  };

  const newSeed = () => {
    const s = { ...state.settings };

    s.seed = Math.random();

    setState({ ...state, settings: s });
  };

  // methods for setting application state
  const setters = {
    setDimensions,
    setColours,
    setGeometry,
    setImage,
    setUseImage,
    newSeed,
  };

  return (
    <Container>
      <GlobalStyles />
      <Display settings={settings} updateOutput={updateOutput} />
      <Controls
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
