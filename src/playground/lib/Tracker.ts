export default class Tracker {
  private results: { [x: string]: number } = {};

  private total: number = 0;

  newLabel() {
    return `test-${Object.keys(this.results).length + 1}`;
  }

  async test({
    func,
    label = this.newLabel(),
    shouldReturn = false,
    async = false,
  }: {
    func: () => any;
    label?: string;
    shouldReturn?: boolean;
    async?: boolean;
  }) {
    const start = performance.now();

    let result;

    if (async) {
      result = await func();
    } else {
      result = func();
    }

    const end = performance.now();
    const time = end - start;

    this.results[label] = time;
    this.total += time;

    if (shouldReturn) {
      return result;
    }

    return time;
  }

  getResults() {
    return this.results;
  }

  getTotal() {
    return this.total;
  }

  log() {
    console.table({ ...this.results, total: this.total });
  }

  reset() {
    this.results = {};
    this.total = 0;
  }
}
