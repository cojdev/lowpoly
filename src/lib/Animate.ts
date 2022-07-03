export default class Animate {
  static slideUp(elem: HTMLElement) {
    const height = elem.offsetHeight;

    elem.style.height = `${height}px`;

    setTimeout(() => {
      elem.style.height = '0px';
    });
  }

  static slideDown(elem: HTMLElement) {
    const height = elem.children[0].scrollHeight;
    elem.style.height = '0px';

    setTimeout(() => {
      elem.style.height = `${height}px`;
    }, 35);
  }
}
