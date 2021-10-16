import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

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

const ColourControls = (props) => {
  const [state, setState] = useState({
    maxColours: 12,
    active: 0,
    settings: props.settings,
  });

  const { settings, active } = state;

  useEffect(() => {
    const newState = { ...state };
    newState.settings = props.settings;

    if (!settings[active]) {
      console.log('not active: ', active, settings);
      newState.active = settings.length - 1;
    }

    setState({ ...newState });
  }, [props.settings]);

  /**
   * Add a colour to current palette
   */
  const handleAddColour = () => {
    const s = [...state.settings];

    if (s.length < state.maxColours) {
      s.push(colour.hexToHsl(colour.getRandomHex(true)));
      setState({ ...state, settings: s });
      props.setColours(s);
    }
  };

  /**
   * Remove a colour from the current palette
   */
  const handleRemoveColour = () => {
    const s = [...state.settings];

    if (s.length > 1) {
      s.splice(active, 1);

      if (active > s.length - 1) {
        setState({ ...state, active: s.length - 1, s });
      } else {
        setState({ ...state, settings: s });
      }

      props.setColours(s);
    }
  };

  /**
   * Select a colour in the active palette triggered by an event
   */
  const setActiveColour = (e) => {
    setState({
      ...state,
      active: parseInt(e.target.getAttribute('data-id'), 10),
    });
  };

  /**
   * Handle change in colour component values
   */
  const handleChange = (e) => {
    const { target } = e;
    const value = parseInt(target.value, 10);
    // deep clone global colours
    const colours = [...props.settings].map((item) => [...item]);

    if (target.name === 'hue') colours[active][0] = value;
    if (target.name === 'saturation') colours[active][1] = value;
    if (target.name === 'luminosity') colours[active][2] = value;

    setState({ ...state, settings: colours });
  };

  /**
   * Set the global palette value
   */
  const handleMouseUp = () => {
    const colours = [...state.settings];
    props.setColours(colours);
  };

  if (settings) {
    const activeColour = settings[active];

    let hueBarBg = 'linear-gradient(to right,';
    let satBarBg = 'linear-gradient(to right,';
    let lumBarBg = 'linear-gradient(to right,';

    for (let i = 0; i <= 6; i++) {
      const hh = i * 60;
      const hs = activeColour[1];
      const hl = activeColour[2];
      hueBarBg += `hsl(${hh}, ${hs}%,${hl}%)${i !== 6 ? ',' : ')'}`;

      if (i < 2) {
        const sh = activeColour[0];
        const ss = i * 100;
        const sl = activeColour[2];
        satBarBg += `hsl(${sh}, ${ss}%, ${sl}%)${i !== 1 ? ',' : ')'}`;
      }

      if (i < 3) {
        const lh = activeColour[0];
        const ls = activeColour[1];
        const ll = i * 50;
        lumBarBg += `hsl(${lh}, ${ls}%, ${ll}%)${i !== 2 ? ',' : ')'}`;
      }
    }

    const colourInputs = settings.map((item, index) => (
      <ColourInput
        value={item}
        key={index}
        index={index}
        single={settings.length === 1}
        active={active === index && settings.length > 1}
        setActiveColour={setActiveColour}></ColourInput>
    ));

    return (
      <ControlGroup title="Colours">
        <SmallButton
          onClick={handleAddColour}
          disabled={!(settings.length < state.maxColours)}>
          Add
        </SmallButton>
        <SmallButton
          onClick={handleRemoveColour}
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
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          background={hueBarBg}
        />

        <Label>saturation: {activeColour[1]}</Label>
        <RangeInput
          min="0"
          max="100"
          name="saturation"
          value={activeColour[1]}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          background={satBarBg}
        />

        <Label>luminosity: {activeColour[2]}</Label>
        <RangeInput
          min="0"
          max="100"
          name="luminosity"
          value={activeColour[2]}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          background={lumBarBg}
        />
      </ControlGroup>
    );
  }

  return <div>Loading...</div>;
};

ColourControls.propTypes = {
  setColours: PropTypes.func,
  settings: PropTypes.any,
};

export default ColourControls;
