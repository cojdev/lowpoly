import React from 'react';

import styled, { css } from 'styled-components';
import * as colour from '../common/colour';

// widgets
import ColourInput from '../widgets/ColourInput';
import { Label } from '../widgets/Fields';
import RangeInput from '../widgets/RangeInput';
import ControlGroup from '../widgets/ControlGroup';
import Button from '../widgets/Button';

const SmallButton = styled(Button)`
  display: inline-block;
  padding: 0.5ch 0.5rem;
  margin: 0 0.5ch;
  width: auto;

  :first-child {
    margin-left: 0;
  }

  ${(props) =>
    props.disabled &&
    css`
      background: #eee;
      color: #888;
    `}
`;

const ColourGroup = styled.div`
  width: 100%;
  height: 2rem;
  position: relative;
  margin: 1em 0;
  border-radius: 3px;
`;

const ColourGroupInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
`;

export default class ColourControls extends React.Component {
  constructor(props) {
    super(props);
    const settings = [...this.props.settings];

    this.state = {
      maxColours: 12,
      active: 0,
      h: null,
      s: null,
      l: null,
      settings,
    };
  }

  componentDidUpdate(prevProps) {
    const { settings } = this.props;
    const { active } = this.state;

    const newState = Object.create(null);
    if (settings !== prevProps.settings) {
      // console.log(settings);
      newState.settings = settings;

      if (!settings[active]) {
        console.log('not active: ', active, settings);
        newState.active = settings.length - 1;
      }

      this.setState(newState);
    }
  }

  /**
   * Add a colour to current palette
   */
  handleAddColour() {
    const settings = [...this.state.settings];

    if (settings.length < this.state.maxColours) {
      settings.push(colour.hexToHsl(colour.getRandomHex(true)));
      this.setState({ settings }, () =>
        this.props.setColours.call(this, this.state.settings)
      );
    }
  }

  /**
   * Select a colour in the active palette triggered by an event
   */
  setActiveColour(e) {
    this.setState({ active: parseInt(e.target.getAttribute('data-id'), 10) });
  }

  /**
   * Remove a colour from the current palette
   */
  handleRemoveColour() {
    const settings = [...this.state.settings];
    const { active } = this.state;

    if (settings.length > 1) {
      settings.splice(active, 1);

      if (active > settings.length - 1) {
        this.setState({ active: settings.length - 1, settings }, () => {
          this.props.setColours.call(this, settings);
        });
      } else {
        this.setState({ settings }, () =>
          this.props.setColours.call(this, this.state.settings)
        );
      }
    }
  }

  /**
   * Handle change in colour component values
   */
  handleChange(e) {
    const { target } = e;
    const { active } = this.state;
    const value = parseInt(target.value, 10);
    // deep clone global colours
    const colours = [...this.props.settings].map((item) => [...item]);

    if (target.name === 'hue') colours[active][0] = value;
    if (target.name === 'saturation') colours[active][1] = value;
    if (target.name === 'luminosity') colours[active][2] = value;

    this.setState({ settings: colours });
  }

  /**
   * Set the global palette value
   */
  handleMouseUp() {
    const colours = this.state.settings.slice();
    this.props.setColours.call(this, colours);
  }

  /**
   * Set a selected palette as the current palette
   */
  handleSetPalette(palette) {
    this.setState({ active: 0 });
    this.props.setColours(palette);
  }

  render() {
    const { settings, active } = this.state;

    if (settings) {
      const activeColour = settings[active];

      let hueBarBg = 'linear-gradient(to right,';
      let satBarBg = 'linear-gradient(to right,';
      let lumBarBg = 'linear-gradient(to right,';

      for (let i = 0; i <= 6; i++) {
        hueBarBg += `hsl(${i * 60}, ${activeColour[1]}%,${activeColour[2]}%)${
          i !== 6 ? ',' : ')'
        }`;
        if (i < 2) {
          satBarBg += `hsl(${activeColour[0]}, ${i * 100}%, ${
            activeColour[2]
          }%)${i !== 1 ? ',' : ')'}`;
        }
        if (i < 3) {
          lumBarBg += `hsl(${activeColour[0]}, ${activeColour[1]}%, ${
            i * 50
          }%)${i !== 2 ? ',' : ')'}`;
        }
      }

      const colourInputs = settings.map((item, index) => (
        <ColourInput
          value={item}
          key={index}
          index={index}
          active={active === index}
          setActiveColour={this.setActiveColour.bind(this)}></ColourInput>
      ));

      return (
        <ControlGroup title="Colours">
          <SmallButton
            onClick={this.handleAddColour.bind(this)}
            disabled={!(settings.length < this.state.maxColours)}>
            Add
          </SmallButton>
          <SmallButton
            onClick={this.handleRemoveColour.bind(this)}
            disabled={!(settings.length > 1)}>
            Remove
          </SmallButton>

          <ColourGroup>
            <ColourGroupInner>{colourInputs}</ColourGroupInner>
          </ColourGroup>

          <Label>hue: {activeColour[0]}</Label>
          <RangeInput
            min="0"
            max="360"
            name="hue"
            value={activeColour[0]}
            onChange={this.handleChange.bind(this)}
            onMouseUp={this.handleMouseUp.bind(this)}
            background={hueBarBg}
          />

          <Label>saturation: {activeColour[1]}</Label>
          <RangeInput
            min="0"
            max="100"
            name="saturation"
            value={activeColour[1]}
            onChange={this.handleChange.bind(this)}
            onMouseUp={this.handleMouseUp.bind(this)}
            background={satBarBg}
          />

          <Label>luminosity: {activeColour[2]}</Label>
          <RangeInput
            min="0"
            max="100"
            name="luminosity"
            value={activeColour[2]}
            onChange={this.handleChange.bind(this)}
            onMouseUp={this.handleMouseUp.bind(this)}
            background={lumBarBg}
          />
        </ControlGroup>
      );
    }

    return <div>Loading...</div>;
  }
}
