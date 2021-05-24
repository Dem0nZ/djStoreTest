import { slides } from './slides'
const slidesUl = document.querySelector('.slides')
const slider = document.querySelector('.slider')
const nextBtn = document.querySelector( '#nextSlide' )
const prevBtn = document.querySelector( '#prevSlide' )

const slideWidth = 375
const fadedSlideOpacity = 0.2

const createBackground = (slide) => {
    let bg = document.createElement('div')
    bg.className = 'background'
    bg.insertAdjacentHTML('afterbegin', `<img src=${slide.bgPath}/>`)
    return bg
}

const createSlide = (slide) => {
    let li = document.createElement('li')
    li.className = 'slider-item'
    li.insertAdjacentHTML('afterbegin', `<h2>${slide.h2Right}</h2><p>${slide.pRight}</p>`)
    return li
}

let position = 0
let firstSlide = createSlide(slides[position])
let secondSlide = createSlide(slides[position + 1])
secondSlide.style.opacity = fadedSlideOpacity.toString()

let currentBg = createBackground(slides[position])

slidesUl.append(firstSlide)
slidesUl.append(secondSlide)

slider.prepend(currentBg)

let animationInProgress = false

const moveNext = () => {
    if (animationInProgress) {
        return
    }

    animationInProgress = true
    let nextSlidePosition = position + 2
    if (nextSlidePosition >= slides.length) {
        nextSlidePosition = nextSlidePosition % slides.length
    }

    let nextBackgroundPosition = position + 1
    if (nextBackgroundPosition >= slides.length) {
        nextBackgroundPosition = nextBackgroundPosition % slides.length
    }

    let newBg = createBackground(slides[nextBackgroundPosition])
    slider.prepend(newBg)

    let newSlide = createSlide(slides[nextSlidePosition])
    newSlide.style.opacity = fadedSlideOpacity.toString()
    slidesUl.append(newSlide)

    firstSlide.ontransitionend = () => {
        firstSlide.remove()
        firstSlide = secondSlide
        secondSlide = newSlide

        currentBg.remove()
        currentBg = newBg

        position++
        if (position >= slides.length) {
            position = 0
        }

        animationInProgress = false
    }
    firstSlide.style.marginLeft = `-${slideWidth}px`
    firstSlide.style.transition = 'margin-left ease 3s'
    secondSlide.style.opacity = '1.0'
    secondSlide.style.transition = 'opacity ease 3s'

    currentBg.style.opacity = '0'
    currentBg.style.transition = 'opacity ease 3s'
}

const movePrev = () => {
    if (animationInProgress) {
        return
    }

    animationInProgress = true

    let prevPosition = position - 1
    if (prevPosition < 0) {
        prevPosition = slides.length - 1
    }

    let newBg = createBackground(slides[prevPosition])
    slider.prepend(newBg)

    let newSlide = createSlide(slides[prevPosition])
    slidesUl.prepend(newSlide)

    newSlide.onanimationend = () => {
        secondSlide.remove()
        secondSlide = firstSlide
        firstSlide = newSlide
        secondSlide.style = `opacity: ${fadedSlideOpacity}`;
        firstSlide.onanimationend = null

        currentBg.remove()
        currentBg = newBg

        position--
        if (position < 0) {
            position = slides.length - 1
        }
        animationInProgress = false
    }

    newSlide.style = 'animation: move_prev 3s ease 0s alternate;'
    firstSlide.style = 'animation: opacity_prev 3s ease alternate;'
    currentBg.style = 'animation: opacity_bg 3s ease;'
}

nextBtn.onclick = () => moveNext()
prevBtn.onclick = () => movePrev()
