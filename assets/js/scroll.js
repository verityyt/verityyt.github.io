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

        const nodes = document.getElementById("full-page").childNodes
        let content = ""

        for (let i = 0; i < nodes.length; i++) {
            if (i === index) {
                content = document.getElementById("full-page").children[i].getAttribute("display")
            }
        }

        text.textContent = content
        if (index > 0) {
            text.className = "indicator-text hidden"
        } else {
            text.className = "indicator-text"
        }

        container.appendChild(dot)
        container.appendChild(text)


        indicator.appendChild(container);
        slideIndicators.push(dot);
    });

    document.body.appendChild(indicator);
    fps.onslide = function () {
        setTimeout(function () {
            let removeFrom = document.createElement("div")

            slideIndicators.forEach(function (slideIndicator, index) {
                if (index === fps.currentSlide) {
                    slideIndicator.className = "active";
                } else {
                    slideIndicator.className = "";
                }

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

            updateIndicatorColor(fps.currentSlide)
        }, 250)
    }
});

function updateIndicatorColor(index) {
    let color = "white"

    if (isOdd(index)) {
        color = "#1f232b"
    }

    const nodes = document.getElementById("indicator").childNodes
    for (let i = 0; i < nodes.length; i++) {
        const dot = nodes[i].childNodes[0]
        const text = nodes[i].childNodes[1]

        dot.style.backgroundColor = color
        text.style.color = color

    }
}

function isOdd(value) {
    if (value % 2 != 0)
        return true;
    else
        return false;
}