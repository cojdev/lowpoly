import PRNG from './PRNG';

describe('PRNG', () => {
  it('should generate a pseudo-random value between 1 and 2^32 - 2', () => {
    const prng = new PRNG(1);
    expect(prng.next()).toBe(16807);
    expect(prng.next()).toBe(282475249);
    expect(prng.next()).toBe(1622650073);
  });

  it('should return a pseudo-random floating point number in range [0, 1)', () => {
    const prng = new PRNG(1);
    expect(prng.generate()).toBe(0.000007825903601782307);
    expect(prng.generate()).toBe(0.13153778773875702);
    expect(prng.generate()).toBe(0.7556053220812281);
  });

  it('should reset the seed', () => {
    const prng = new PRNG(1);
    prng.next();
    prng.next();
    prng.next();
    prng.reset(1);
    expect(prng.next()).toBe(16807);
    expect(prng.next()).toBe(282475249);
    expect(prng.next()).toBe(1622650073);
  });
});
