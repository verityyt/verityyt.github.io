new FullPageScroll('full-page', {
    transitionTime: 500,
    goToTopOnLast: false
});

// fix scrolling after reload
setTimeout(() => {
    window.scroll(0, 0)
}, 50)