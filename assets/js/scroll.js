const fps = new FullPageScroll('full-page', {
    transitionTime: 500,
    goToTopOnLast: false
});

// fix scrolling after reload
setTimeout(() => {
    window.scroll(0, 0)
}, 50)

document.addEventListener("DOMContentLoaded", function () {
    const indicator = document.createElement('div');
    indicator.id = 'indicator';
    const slideIndicators = [];
    fps.slides.forEach(function (slide, index) {
        const slideIndicator = document.createElement('div');
        slideIndicator.onclick = function () {
            fps.goToSlide(index);
        }
        if (index === fps.currentSlide) {
            slideIndicator.className = "active";
        }
        indicator.appendChild(slideIndicator);
        slideIndicators.push(slideIndicator);
    });
    document.body.appendChild(indicator);
    fps.onslide = function () {
        slideIndicators.forEach(function (slideIndicator, index) {
            if (index === fps.currentSlide) {
                slideIndicator.className = "active";
            } else {
                slideIndicator.className = "";
            }

            updateIndicatorColor(fps.currentSlide)
        });
    }
});

function updateIndicatorColor(index) {
    setTimeout(function () {
        let color = "white"

        if(index == 1) {
            color = "#1f232b"
        }

        const nodes = document.getElementById("indicator").childNodes
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeName.toLowerCase() == 'div') {
                nodes[i].style.backgroundColor = color;
            }
        }
    }, 250)
}