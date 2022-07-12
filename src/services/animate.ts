export const slideUp = (elem: HTMLElement) => {
  const height = elem.offsetHeight;

  elem.style.height = `${height}px`;

  // prevents animation happening instantly
  setTimeout(() => {
    elem.style.height = '0px';
  });
};

export const slideDown = (elem: HTMLElement) => {
  const height = elem.children[0].scrollHeight;
  elem.style.height = '0px';

  setTimeout(() => {
    elem.style.height = `${height}px`;
  }, 35);
};

export default {
  slideUp,
  slideDown,
};
