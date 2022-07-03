/**
 * Creates a pseudo-random value generator. The seed must be an integer.
 *
 * Uses an optimized version of the Park-Miller PRNG.
 * http://www.firstpr.com.au/dsp/rand31/
 */
export default class PRNG {
  initialSeed: number;

  seed: number;

  constructor(seed: number) {
    this.initialSeed = seed;
    this.reset(this.initialSeed);
  }

  /**
   * Returns a pseudo-random value between 1 and 2^32 - 2.
   */
  next() {
    this.seed = (this.seed * 16807) % 2147483647;
    return this.seed;
  }

  /**
   * Returns a pseudo-random floating point number in range [0, 1).
   */
  generate(min = 0, max = 1) {
    // We know that result of next() will be 1 to 2147483646 (inclusive).
    return min + ((this.next() - 1) / 2147483646) * (max - min);
  }

  reset(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) {
      this.seed += 2147483646;
    }
  }
}
