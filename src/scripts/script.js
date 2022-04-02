const generateElement = async () => {
    const apiURL = "https://periodic-table-api.herokuapp.com/"
    const mainData = await getData(apiURL)
    
    const mainTable = document.querySelector("#main-container")
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
    updateElementInformation(elementSymbol);
    
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

    // reset all data
    resetElementInformation()
}

const updateElementInformation = async (elementSymbol) => {
    const elementData = await getData(`https://periodic-table-api.herokuapp.com/atomicSymbol/${elementSymbol}`)

    const mainOverlayContent = document.querySelector("#overlay-content")
    const updatedContent = `
        <header>
            <h1 class="capitalize font-bold text-4xl element-data">${isEmpty(elementData.symbol)}</h1>
            <h2 class="capitalize text-2xl element-data">${isEmpty(elementData.name)}</h2>
        </header>

        <main>
            <p class="text-lg text-gray-700 capitalize">
                Atomic Number : <span class="text-black element-data">${isEmpty(elementData.atomicNumber)}</span>
            </p>
            <p class="text-lg text-gray-700 capitalize">
                Atomic Mass : <span class="text-black element-data">${isEmpty(elementData.atomicMass)}</span>
            </p>
            <p class="text-lg text-gray-700 capitalize">
                Electronic Configuration : <span class="text-black element-data">${isEmpty(elementData.electronicConfiguration)}</span>
            </p>
            <p class="text-lg text-gray-700 capitalize">
                Electron Affinity : <span class="text-black element-data">${isEmpty(elementData.electronAffinity)}</span>
            </p>
            <p class="text-lg text-gray-700 capitalize">
                Ionization Energy : <span class="text-black element-data">${isEmpty(elementData.ionizationEnergy)}</span>
            </p>
        </main>
    `
    mainOverlayContent.innerHTML = updatedContent
}

const resetElementInformation = () => {
    const elementsData = document.querySelectorAll("#overlay-content .element-data")

    // delete all previous element data 
    elementsData.forEach(elData => {
        elData.innerHTML = ""
    })
}

const isEmpty = (string) => {
    return string === "" ? "-" : string
}

// generating copyright year
const copyrightYear = document.querySelector(".copyright .yyyy")
const currentDate = new Date()
copyrightYear.innerHTML = currentDate.getFullYear()

generateElement();