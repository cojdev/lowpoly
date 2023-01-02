export type Dimensions = { width: number; height: number };

export type HSLColour = [number, number, number];

export type Image = {
  src: string;
} & Dimensions;
