import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// Components
import Display from './Display';
import Controls from './Controls';

// Helpers
import data from './data';
import theme from './common/theme';

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

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // default controls values
      defaults: {
        dimensions: {
          width: 1920,
          height: 1080,
        },
        geometry: {
          variance: 30,
          cellSize: 40,
          depth: 10,
          dither: 10,
        },
        colour: data.palettes[0],
        image: {
          src: null,
          height: 0,
          width: 0,
        },
        useImage: false,
      },
      presets: data.presets,
      settings: {},
      output: '',
      controlsOpen: false,
    };

    this.state.settings = Object.assign({}, this.state.defaults);

    // methods for setting application state
    this.setters = {
      setDimensions: this.setDimensions.bind(this),
      setColours: this.setColours.bind(this),
      setGeometry: this.setGeometry.bind(this),
      setImage: this.setImage.bind(this),
      setUseImage: this.setUseImage.bind(this),
    };

    this.toggleControls = this.toggleControls.bind(this);
  }

  /**
   * Open and close the controls on mobile devices
   */
  toggleControls() {
    this.setState({ controlsOpen: !this.state.controlsOpen });
  }

  /**
   * set dimensions of the image in pixels
   * @param {object} obj {width:Number, height:Number}
   */
  setDimensions(obj) {
    const settings = Object.assign({}, this.state.settings);
    settings.dimensions = obj;
    this.setState({ settings });
  }

  /**
   * sets the colours in the palette
   * @param {array} arr array of colour hex values
   */
  setColours(arr) {
    const settings = Object.assign({}, this.state.settings);
    // console.log(arr);
    settings.colour = arr;
    this.setState({ settings });
  }

  /**
   * set geometry
   * @param {number} option attribute being set
   * @param {number} value value
   */
  setGeometry(option, value) {
    const settings = Object.assign({}, this.state.settings);
    settings.geometry[option] = parseInt(value, 10);
    this.setState({ settings });
  }

  /**
   * Sets the selected image
   * @param {string} image url for specified image
   */
  setImage(image) {
    const settings = Object.assign({}, this.state.settings);
    settings.image = image;
    this.setState({ settings });
  }

  /**
   * Toggle using uploaded image in generated picture
   * @param {boolean} boolean
   */
  setUseImage(boolean) {
    const settings = Object.assign({}, this.state.settings);
    settings.useImage = boolean;
    this.setState({ settings });
  }

  /**
   * Updates the output dataURI in state
   * @param {string} value The data URL for the generated canvas
   */
  updateOutput(value) {
    this.setState({ output: value });
  }

  render() {
    const { settings, presets, output } = this.state;

    return (
      <Container>
        <GlobalStyles />
        <Display
          settings={settings}
          updateOutput={this.updateOutput.bind(this)}
        />
        <StyledControls
          settings={settings}
          presets={presets}
          output={output}
          open={this.state.controlsOpen}
          toggleControls={this.toggleControls}
          {...this.setters}
        />
      </Container>
    );
  }
}
