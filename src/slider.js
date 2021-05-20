import { slides } from '../slides'
const sliderWidth = document.querySelector( '.slider-hider' ).offsetWidth
const slidesUl = document.querySelector('.slides')
const nextBtn = document.querySelector( '#nextSlide' )
const prevBtn = document.querySelector( '#prevSlide' )

const slideWidth = 375

const createRightSlide = (slide) => {
    let li = document.createElement('li')
    li.className = 'slider-item'
    li.insertAdjacentHTML('afterbegin', `<h2>${slide.h2Right}</h2><p>${slide.pRight}</p>`)
    return li
}

let position = 0
let firstSlide = createRightSlide(slides[position])
let secondSlide = createRightSlide(slides[position + 1])

slidesUl.append(firstSlide)
slidesUl.append(secondSlide)

let animationInProgress = false

const moveNext = () => {
    if (animationInProgress) {
        return
    }

    animationInProgress = true
    let nextPosition = position + 2
    if (nextPosition >= slides.length) {
        nextPosition = nextPosition % slides.length
    }

    let newSlide = createRightSlide(slides[nextPosition])
    slidesUl.append(newSlide)

    firstSlide.ontransitionend = () => {
        firstSlide.remove()
        firstSlide = secondSlide
        secondSlide = newSlide

        position++
        if (position >= slides.length) {
            position = 0
        }

        animationInProgress = false
    }
    firstSlide.style.marginLeft = `-${slideWidth}px`
    firstSlide.style.transition = 'margin-left ease 1s'
}

const movePrev = () => {
    if (animationInProgress) {
        return
    }

    animationInProgress = true

    let prevPosition = position - 1
    if (prevPosition <= 0) {
        prevPosition = slides.length - 1
    }

    let newSlide = createRightSlide(slides[prevPosition])
    newSlide.style.marginLeft = `-${slideWidth}px`
    slidesUl.prepend(newSlide)

    firstSlide.ontransitionend = () => {
        secondSlide.remove()
        secondSlide = firstSlide
        firstSlide = newSlide

        position--
        if (position <= 0) {
            position = slides.length - 1
        }
        animationInProgress = false
    }
    firstSlide.style.marginLeft = `${slideWidth}px`
    firstSlide.style.transition = 'margin-left ease 1s'
}


nextBtn.addEventListener('click', () => moveNext())
prevBtn.addEventListener('click', () => movePrev())
