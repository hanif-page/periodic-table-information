const generateElement = async () => {
    const apiURL = "https://neelpatel05.pythonanywhere.com/"
    const mainData = await getData(apiURL)
    
    const mainTable = document.querySelector("#main-table")
    mainTable.innerHTML = ""
    mainData.forEach(data => {
        let newElement = `<div onclick="openOverlay(this.id)" id="${data.symbol}">${data.symbol}</div>`
        
        mainTable.innerHTML += newElement
    });
    stopLoadingAnimation();
}
const getData = (apiURL) => {
    return fetch(apiURL)
            .then(response => response.json())
            .then(response => response)
            .catch(err => err)
}
const openOverlay = (elementSymbol) => {
    refreshElementInformation(elementSymbol);
    
    const mainOverlay = document.querySelector("#main-overlay")
    const body = document.querySelector("body")
    body.classList.add("overflow-hidden")
    mainOverlay.classList.remove("opacity-0")
    mainOverlay.classList.remove("pointer-events-none")
}
const closeOverlay = () => {
    const mainOverlay = document.querySelector("#main-overlay")
    const body = document.querySelector("body")
    body.classList.remove("overflow-hidden")
    mainOverlay.classList.add("opacity-0")
    mainOverlay.classList.add("pointer-events-none")
}
const refreshElementInformation = async (elementSymbol) => {
    const elementData = await getData(`https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${elementSymbol}`)

    const mainOverlayContent = document.querySelector("#overlay-content")
    const refreshedContent = `
        <header>
            <h1 class="capitalize font-bold text-4xl">${isEmpty(elementData.symbol)}</h1>
            <h2 class="capitalize text-2xl">${isEmpty(elementData.name)}</h2>
        </header>

        <main>
            <p class="text-lg text-gray-700 capitalize">
                Atomic Number : <span class="text-black">${isEmpty(elementData.atomicNumber)}</span>
            </p>
            <p class="text-lg text-gray-700 capitalize">
                Atomic Mass : <span class="text-black">${isEmpty(elementData.atomicMass)}</span>
            </p>
            <p class="text-lg text-gray-700 capitalize">
                Electronic Configuration : <span class="text-black">${isEmpty(elementData.electronicConfiguration)}</span>
            </p>
            <p class="text-lg text-gray-700 capitalize">
                Electron Affinity : <span class="text-black">${isEmpty(elementData.electronAffinity)}</span>
            </p>
            <p class="text-lg text-gray-700 capitalize">
                Ionization Energy : <span class="text-black">${isEmpty(elementData.ionizationEnergy)}</span>
            </p>
        </main>
    `
    mainOverlayContent.innerHTML = refreshedContent
}
const isEmpty = (string) => {
    return string === "" ? "-" : string
}

generateElement();