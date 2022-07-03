import { Dimensions, HSLColour } from '../utils/types';

export type SettingsPresets = {
  palettes: HSLColour[];
  dimensions: Record<'Mobile' | 'Desktop', { [y: string]: Dimensions }>;
};

export default {
  palettes: [
    [
      [195, 85, 53],
      [265, 64, 40],
      [340, 85, 53],
      [25, 85, 53],
      [50, 100, 75],
    ],
    [
      [346, 86, 50],
      [30, 85, 53],
      [60, 85, 53],
      [109, 85, 53],
      [200, 85, 53],
      [240, 73, 50],
      [270, 85, 53],
    ],
    [
      [218, 56, 12],
      [349, 31, 64],
      [18, 100, 84],
    ],
    [
      [276, 71, 46],
      [9, 86, 50],
      [53, 100, 70],
    ],
    [
      [210, 57, 53],
      [199, 100, 70],
    ],
    [
      [270, 50, 13],
      [225, 50, 26],
    ],
    [
      [320, 100, 70],
      [266, 69, 56],
      [166, 100, 56],
    ],
  ] as HSLColour[][],
  dimensions: {
    Mobile: {
      'iPhone 6/7/8/SE': {
        width: 750,
        height: 1334,
      },
      'iPhone 6+/7+/8+': {
        width: 1080,
        height: 1920,
      },
      'iPhone 1X': {
        width: 1125,
        height: 2436,
      },
      'iPhone 1X Max': {
        width: 1242,
        height: 2688,
      },
      'Samsung Galaxy S10': {
        width: 1440,
        height: 2960,
      },
      'Google Pixel': {
        width: 1080,
        height: 1920,
      },
      'Google Pixel XL': {
        width: 1440,
        height: 2960,
      },
    },
    Desktop: {
      '720p': {
        width: 1280,
        height: 720,
      },
      '1080p': {
        width: 1920,
        height: 1080,
      },
      '1440p': {
        width: 2560,
        height: 1440,
      },
      '2160p (4K)': {
        width: 3840,
        height: 2160,
      },
    },
  },
};
