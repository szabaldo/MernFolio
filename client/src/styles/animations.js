export const fadeIn = {
    opacity: [0, 1], 
}
export const fadeInOptions = {
    duration: 250,
    easing: "ease",
    fill: "forwards"
}

export const fadeOut = {
    opacity: [1, 0]
}
export const fadeOutOptions = {
    duration: fadeInOptions.duration,
    easing: "ease",
    fill: "forwards"
}

const scalePercent = 90;
export const portraitSlideLeft = {
    transform: ["translateX(0px)", `translateX(-50px) scale(${scalePercent}%)`],
    opacity: [1, 0],
}
export const portraitSlideLeftOptions = {
    duration: fadeInOptions.duration,
    easing: "ease-in",
    fill: "forwards"
}

const displacementAmount = 50;
export const portraitAppearLeft = {
    transform: [`translateX(${displacementAmount}px) scale(${scalePercent}%)` , `translateX(${0}px)`],
    opacity: [0, 1],
}
export const portraitAppearLeftOptions = {
    duration: fadeInOptions.duration,
    easing: "ease-out",
    fill: "forwards"
}