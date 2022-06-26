import PropTypes from 'prop-types';
import React from 'react';

// widgets
import ColourPalette from '../ColourPalette';
import ControlGroup from './ControlGroup';

import presets from '../../data/presets';

const PaletteControls = ({ setColours }) => (
  <ControlGroup title="Palettes">
    {presets.palettes.map((item, index) => (
      <ColourPalette key={index} colours={item} handleSetPalette={setColours} />
    ))}
  </ControlGroup>
);

PaletteControls.propTypes = {
  setColours: PropTypes.any,
};

export default PaletteControls;
