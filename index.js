class Project {
    constructor(description, mediaSrc, link, video = false) {
        this.description = description
        this.mediaSrc = mediaSrc
        this.link = link
        this.video = video
    }
}

const projects = [
    new Project("Landing Page","./imgs/landing.JPG", "https://m9-gbr.github.io/Uncle-Joe-s-Pizza/"),
    new Project("Seeded Minesweeper", "./imgs/minesweeper.JPG", "https://seeded-minesweeper.github.io"),
    new Project("Calculator", "./imgs/calc.JPG", "https://m9-gbr.github.io/calculator/"),
    new Project("Audio Cutter", "./imgs/audio-cutter.JPG", "https://m9-gbr.github.io/audio-cutter/"),
    new Project("Clock", "./imgs/clock.JPG", "https://m9-gbr.github.io/web-clock"),
    new Project("Sign-Up / Log-In Page", "./imgs/sign-up_log-in.JPG", "https://m9-gbr.github.io/forms-project/sign-in")
]

let card = document.getElementsByClassName("card")[0]
card.remove()

projects.forEach(project => {
    let newCard = card.cloneNode(true),
        video = newCard.querySelector("video"),
        img = newCard.querySelector("img"),
        descripion = newCard.querySelector(".card-description"),
        link = newCard.querySelector("a")

    if (project.video) {
        newCard.classList.add("video-card")
        video.volume = 0
        video.src = project.mediaSrc

        newCard.addEventListener("pointerenter", () => {
            if (navigator.userActivation.hasBeenActive) video.play()
        })
    
        newCard.addEventListener("pointerleave", () => {
            video.pause()
            video.currentTime = 0
        })
    } else {
        img.src = project.mediaSrc
    }

    descripion.innerHTML = project.description
    link.href = project.link

    document.getElementById("cards-wrap").appendChild(newCard)
})

let dist = 500, iterations = 0

function startBGAnimLoop() {
    let bgElem = document.getElementById("background-wrap")

    let anim = bgElem.animate([
        { "backgroundPosition": `${dist + dist * iterations}px ${dist + dist * iterations}px` }
    ], { duration: 10000, easing: "linear", fill: "forwards" })

    anim.onfinish = () => {
        iterations++
        startBGAnimLoop()
    }
}

startBGAnimLoop()

window.addEventListener("scroll", () => {
    let elem = document.getElementById("to-top-btn")

    if (window.scrollY == 0) {
        elem.querySelector("a").blur()
        elem.classList.add("hidden")
    } else {
        elem.classList.remove("hidden")
    }
})