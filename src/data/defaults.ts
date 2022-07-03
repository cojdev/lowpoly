import { HSLColour, Dimensions } from '../utils/types';
import presets from './presets';

export type SettingsState = {
  dimensions: Dimensions;
  geometry: {
    variance: number;
    cellSize: number;
    depth: number;
    dither: number;
  };
  colour: HSLColour[];
  image:
    | ({
        src: string;
      } & Dimensions)
    | null;
  useImage: boolean;
  seed: number;
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
  seed: 0,
};

export default defaults;
