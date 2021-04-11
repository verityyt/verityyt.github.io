console.log("Init scroll")

new FullPageScroll('full-page', {
    transitionTime: 1000,
    goToTopOnLast: false
});

// fix scrolling after reload
setTimeout(() => {
    window.scroll(0, 0)
}, 50)