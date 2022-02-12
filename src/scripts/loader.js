const startLoadingAnimation = () => {
    const body = document.querySelector("body")
    const loaderContainer = document.querySelector('.loader')

    body.classList.add("overflow-hidden")
    loaderContainer.classList.remove("opacity-0")
    loaderContainer.classList.remove("pointer-events-none")
}

const stopLoadingAnimation = () => {
    const body = document.querySelector("body")
    const loaderContainer = document.querySelector('.loader')

    body.classList.remove("overflow-hidden")
    loaderContainer.classList.add("opacity-0")
    loaderContainer.classList.add("pointer-events-none")
}