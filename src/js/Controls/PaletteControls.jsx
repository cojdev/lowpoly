import React from 'react';

// widgets
import ColourPalette from '../widgets/ColourPalette';
import ControlGroup from '../widgets/ControlGroup';

import presets from '../presets';

const PaletteControls = (props) => (
  <ControlGroup title="Palettes">
    {presets.palettes.map((item, index) => (
      <ColourPalette
        key={index}
        colours={item}
        handleSetPalette={props.setColours}
      />
    ))}
  </ControlGroup>
);

export default PaletteControls;
