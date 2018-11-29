export default {
    slideUp: (elem) => {
        const height = elem.offsetHeight;

        elem.style.height = height + 'px';

        requestAnimationFrame(() => {
            elem.style.height = '0px';
        });
    },
    slideDown: (elem) => {
        
        const height = elem.children[0].scrollHeight;
        elem.style.height = '0px';

        requestAnimationFrame(() => {
        elem.style.height = height + 'px';
        });
    },
}