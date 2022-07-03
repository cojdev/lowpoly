import React, { FC } from 'react';

// widgets
import ColourPalette from '../ColourPalette';
import ControlGroup from './ControlGroup';

import presets from '../../data/presets';
import { HSLColour } from '../../utils/types';

const PaletteControls: FC<{ setColours: (x: HSLColour[]) => void }> = ({
  setColours,
}) => (
  <ControlGroup title="Palettes">
    {presets.palettes.map((item, index) => (
      <ColourPalette key={index} colours={item} handleSetPalette={setColours} />
    ))}
  </ControlGroup>
);

export default PaletteControls;
