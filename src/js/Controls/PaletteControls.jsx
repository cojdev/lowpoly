import React from 'react';

// widgets
import ColourPalette from '../widgets/ColourPalette';
import ControlGroup from '../widgets/ControlGroup';

import data from '../data';

const PaletteControls = props => (
    <ControlGroup title="Palettes">
      {data.palettes.map((item, index) => (
        <ColourPalette
          key={index}
          colours={item}
          handleSetPalette={props.setColours.bind(this)}
        />
      ))}
    </ControlGroup>
);

export default PaletteControls;
