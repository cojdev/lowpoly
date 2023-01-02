# Low Poly Generator

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y829JJM)

Lowpoly is a simple, lightweight JavaScript library for creating low poly images.

It uses a combination of Delaunay triangulation and Voronoi tessellation to create a low poly effect.

It's designed to be easy to use and extend, and is fully customisable.

Try it out here: https://cojdev.github.io/lowpoly

## Features

* Customisable
* Lightweight
* Easy to use
* Fully documented

## Examples

### Basic usage

```ts
import Lowpoly from '@cojdev/lowpoly';

// Get the element to render the image to
const element = document.getElementById('lowpoly');

// Create a new instance of Lowpoly
const lowpoly = new Lowpoly(element);

// Render the image
lowpoly.render({
  variance: 4,
  cellSize: 50,
  depth: 0,
  dither: 0,
  image: null,
  colours: [
    [0, 0, 100],
    [0, 0, 100],
  ],
  useImage: false,
  seed: 0,
});
```

### Custom colours

```ts
import Lowpoly from '@cojdev/lowpoly';

const element = document.getElementById('lowpoly');
const lowpoly = new Lowpoly(element);

lowpoly.render({
  variance: 4,
  cellSize: 50,
  depth: 0,
  dither: 0,
  colours: [
    [0, 0, 100],
    [0, 100, 0],
  ],
});
```

### Using an image

```ts
import Lowpoly from '@cojdev/lowpoly';

const element = document.getElementById('lowpoly');
const lowpoly = new Lowpoly(element);

lowpoly.render({
  variance: 4,
  cellSize: 50,
  depth: 0,
  dither: 0,
  image: {
    src: 'https://source.unsplash.com/random',
  },
  useImage: true,
});
```