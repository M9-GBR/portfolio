let lastY = 0, header = document.getElementById("header")

document.addEventListener("scroll", () => {
    if (scrollY > lastY) header.classList.add("hide-up")
    else header.classList.remove("hide-up")
    lastY = scrollY
})

let headerBtn = document.getElementById("header-link-btn"),
    wrap = document.getElementById("header-links-wrap")

headerBtn.addEventListener("click", () => {
    wrap.dataset.open = Number(!Number(wrap.dataset.open))
})

document.addEventListener("click", ev => {
    if (!wrap.contains(ev.target)) wrap.dataset.open = "0"
})

wrap.querySelectorAll("#header-links a").forEach(a => {
    a.addEventListener("click", () => wrap.dataset.open = "0")
})

class Project {
    constructor(description, mediaSrc, link, video = false) {
        this.description = description
        this.mediaSrc = mediaSrc
        this.link = link
        this.video = video
    }
}

const projects = [
    new Project("Landing Page", "./imgs/landing.JPG", "https://m9-gbr.github.io/Uncle-Joe-s-Pizza/"),
    new Project("Seeded Minesweeper", "./imgs/minesweeper.JPG", "https://m9-gbr.github.io/minesweeper"),
    new Project("Calculator", "./imgs/calc.JPG", "https://m9-gbr.github.io/calculator/"),
    new Project("Audio Cutter", "./imgs/audio-cutter.JPG", "https://m9-gbr.github.io/audio-cutter/"),
    new Project("Clock", "./imgs/clock.JPG", "https://m9-gbr.github.io/web-clock"),
    new Project("Sign-Up / Log-In Page", "./imgs/sign-up_log-in.JPG", "https://m9-gbr.github.io/forms-project/sign-in"),
    new Project("Matrix Wizard", "./imgs/mat_w.JPG", "https://m9-gbr.github.io/matrix-wizard")
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

const carousel = {
    elem: document.getElementById("carousel"),
    isScrolling: false,
    get items() {
        return [...document.querySelectorAll(".carousel-item")]
    },
    get curID() {
        return Number(this.itemsWrap.children[0].dataset.id)
    },
    get curItem() {
        return this.getItem(this.curID)
    },
    scrollConfig: { block: "center", container: "nearest" },
    get scrollConfigInst() {
        return { ...this.scrollConfig, behavior: "instant" }
    },
    itemsWrap: document.getElementById("carousel-items"),
    navBtnsWrap: document.getElementById("carousel-nav-btns"),
    backBtn: document.querySelector(".carousel-move-btn:first-of-type"),
    frontBtn: document.querySelector(".carousel-move-btn:last-of-type"),
    get navBtns() {
        return [...document.querySelectorAll("#carousel-nav-btns button")]
    },
    init() {
        for (let i = 0; i < this.items.length; i++) {
            let btn = document.createElement("button")

            btn.dataset.id = i + 1

            this.navBtnsWrap.appendChild(btn)

            if (!i) btn.classList.add("current")

            btn.addEventListener("click", () => this.moveTo(i + 1, i + 1 < this.curID))
        }

        this.backBtn.addEventListener("click", () => this.moveBack())
        this.frontBtn.addEventListener("click", () => this.moveFront())

        this.startMoveTimeout()
    },
    getItem(id) {
        return this.itemsWrap.querySelector(`.carousel-item[data-id="${id}"]`)
    },
    moveTo(id, back = false) {
        if (!this.isScrolling) {
            this.isScrolling = true

            this.startMoveTimeout()

            let curItem = this.curItem, nextItem = this.getItem(id)

            this.navBtns.forEach(b => b.classList.remove("current"))
            this.navBtns.find(b => b.dataset.id == id).classList.add("current")

            if (back) {
                this.itemsWrap.prepend(nextItem)

                this.itemsWrap.addEventListener("scrollend", () => {
                    this.itemsWrap.addEventListener("scrollend", () => this.isScrolling = false, { once: true })
                }, { once: true })

                curItem.scrollIntoView(this.scrollConfigInst)
                nextItem.scrollIntoView(this.scrollConfig)
            } else {
                curItem.after(nextItem)

                this.itemsWrap.addEventListener("scrollend", () => {
                    this.isScrolling = false

                    this.itemsWrap.append(curItem)
                    nextItem.scrollIntoView(this.scrollConfigInst)
                }, { once: true })

                nextItem.scrollIntoView(this.scrollConfig)
            }
        }
    },
    moveBack() {
        this.moveTo(this.curID - 1 == 0 ? this.items.length : this.curID - 1, true)
    },
    moveFront() {
        this.moveTo(this.curID + 1 > this.items.length ? 1 : this.curID + 1)
    },
    moveTimeout: null,
    startMoveTimeout() {
        clearTimeout(this.moveTimeout)
        this.moveTimeout = setInterval(() => this.moveFront(), 5000)
    }
}

carousel.init()

document.addEventListener("keydown", ev => {
    if (carousel.elem.contains(document.activeElement)) {
        if (ev.key == "ArrowLeft") carousel.moveBack()
        else if (ev.key == "ArrowRight") carousel.moveFront()
    }
})

window.carousel = carousel