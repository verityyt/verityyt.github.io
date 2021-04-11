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
        const container = document.createElement("div")
        container.className = "indicator-container"
        const dot = document.createElement('div');

        dot.onclick = function () {
            fps.goToSlide(index);
        }

        if (index === fps.currentSlide) {
            dot.className = "active";
        }

        const text = document.createElement("p")

        switch (index) {
            case 0:
                text.textContent = "Home"
                text.className = "indicator-text"
                break;
            case 1:
                text.textContent = "Skills"
                text.className = "indicator-text hidden"
                break;
            case 2:
                text.textContent = "Connect"
                text.className = "indicator-text hidden"
        }

        container.appendChild(dot)
        container.appendChild(text)


        indicator.appendChild(container);
        slideIndicators.push(dot);
    });

    document.body.appendChild(indicator);
    fps.onslide = function () {
        let removeFrom = document.createElement("div")

        slideIndicators.forEach(function (slideIndicator, index) {
            if (index === fps.currentSlide) {
                slideIndicator.className = "active";
            } else {
                slideIndicator.className = "";
            }

            updateIndicatorColor(fps.currentSlide)

            const nodes = document.getElementById("indicator").childNodes

            for (let i = 0; i < nodes.length; i++) {
                const text = nodes[i].childNodes[1]
                text.classList.add("hidden")

                if (i === fps.currentSlide) {
                    removeFrom = text
                }
            }

        });

        removeFrom.classList.remove("hidden")
    }
});

function updateIndicatorColor(index) {
    setTimeout(function () {
        let color = "white"

        if (index == 1) {
            color = "#1f232b"
        }

        const nodes = document.getElementById("indicator").childNodes
        for (let i = 0; i < nodes.length; i++) {
            const dot = nodes[i].childNodes[0]
            const text = nodes[i].childNodes[1]

            dot.style.backgroundColor = color
            text.style.color = color

        }
    }, 250)
}
