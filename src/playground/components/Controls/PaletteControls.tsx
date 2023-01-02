import React, { FC } from 'react';

// widgets
import ColourPalette from '../ColourPalette';
import ControlGroup from './ControlGroup';

import presets from '../../data/presets';
import useDispatch from '../../hooks/useDispatch';

const PaletteControls: FC = () => {
  const dispatch = useDispatch();

  return (
    <ControlGroup title="Palettes">
      {presets.palettes.map((item, index) => (
        <ColourPalette
          key={index}
          colours={item}
          handleSetPalette={(a) => {
            dispatch({ type: 'SET_COLOURS', payload: a });
          }}
        />
      ))}
    </ControlGroup>
  );
};

export default PaletteControls;
