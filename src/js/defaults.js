import presets from './presets';

export default {
  dimensions: {
    width: 1920,
    height: 1080,
  },
  geometry: {
    variance: 30,
    cellSize: 40,
    depth: 10,
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
