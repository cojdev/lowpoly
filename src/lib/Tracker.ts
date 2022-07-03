export default class Tracker {
  results: { [x: string]: number };

  constructor() {
    this.results = {};
  }

  newLabel() {
    return `test-${Object.keys(this.results).length + 1}`;
  }

  test(func: () => any, label: string = this.newLabel(), returnFunc = false) {
    const t0 = performance.now();
    const funcValue = func();
    const t1 = performance.now();
    const ret = t1 - t0;
    this.results[label] = ret;
    if (returnFunc) {
      return funcValue;
    }

    return ret;
  }

  getTotal() {
    return Object.values(this.results).reduce((a: number, b: number) => a + b);
  }

  log() {
    console.table({ ...this.results, total: this.getTotal() });
  }
}
