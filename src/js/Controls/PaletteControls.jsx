import PropTypes from 'prop-types';
import React from 'react';

// widgets
import ColourPalette from '../widgets/ColourPalette';
import ControlGroup from '../widgets/ControlGroup';

import presets from '../presets';

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
