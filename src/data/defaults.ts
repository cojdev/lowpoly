import { HSLColour } from '../utils/helpers';
import presets from './presets';

export type SettingsState = {
  dimensions: {
    width: number;
    height: number;
  };
  geometry: {
    variance: number;
    cellSize: number;
    depth: number;
    dither: number;
  };
  colour: HSLColour[];
  image: {
    src: string;
    width: number;
    height: number;
  } | null;
  useImage: boolean;
};

const defaults: SettingsState = {
  dimensions: {
    width: 1920,
    height: 1080,
  },
  geometry: {
    variance: 30,
    cellSize: 40,
    depth: 20,
    dither: 10,
  },
  colour: presets.palettes[0],
  image: {
    src: null,
    height: 0,
    width: 0,
  },
  useImage: false,
};

export default defaults;
