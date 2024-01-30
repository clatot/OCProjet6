const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()
console.log(works)

const galerie = document.querySelector(".gallery")

function genererWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const workElement = document.createElement("figure")
        
        const workImg = document.createElement("img")
        workImg.src = works[i].imageUrl

        const workCaption = document.createElement("figcaption")
        workCaption.textContent = works[i].title
        
        galerie.appendChild(workElement)
        workElement.appendChild(workImg)
        workElement.appendChild(workCaption)
    }
}

genererWorks(works)

const boutonFiltrerTous = document.querySelector(".tous")
const boutonFiltrerObjects = document.querySelector(".objets")
const boutonFiltrerAppartements = document.querySelector(".appartements")
const boutonFiltrerHotels = document.querySelector(".hotels")

function boutonFiltrerUnselected() {
    boutonFiltrerTous.classList.remove("selected")
    boutonFiltrerObjects.classList.remove("selected")
    boutonFiltrerAppartements.classList.remove("selected")
    boutonFiltrerHotels.classList.remove("selected")
}

boutonFiltrerTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = ""
    genererWorks(works)

    boutonFiltrerUnselected()
    boutonFiltrerTous.classList.add("selected");

    console.log("tous")
})


boutonFiltrerObjects.addEventListener("click", function () {
    const objetsFiltrees = works.filter(function (work) {
        return work.categoryId === 1
    })
    document.querySelector(".gallery").innerHTML = ""
    genererWorks(objetsFiltrees)

    boutonFiltrerUnselected()
    boutonFiltrerObjects.classList.add("selected");

    console.log("objets")
})


boutonFiltrerAppartements.addEventListener("click", function () {
    const appartementsFiltrees = works.filter(function (work) {
        return work.categoryId === 2
    })
    document.querySelector(".gallery").innerHTML = ""
    genererWorks(appartementsFiltrees)

    boutonFiltrerUnselected()
    boutonFiltrerAppartements.classList.add("selected");

    console.log("appartements")
})


boutonFiltrerHotels.addEventListener("click", function () {
    const hotelsFiltrees = works.filter(function (work) {
        return work.categoryId === 3
    })
    document.querySelector(".gallery").innerHTML = ""
    genererWorks(hotelsFiltrees)

    boutonFiltrerUnselected()
    boutonFiltrerHotels.classList.add("selected");

    console.log("hotels")
})


const login = document.querySelector("#login")
const title = document.querySelector("#portfolio-title")
const filter = document.querySelector(".filter")
const titlemodif = document.querySelector("#portfolio-modifier")
const headermodif = document.querySelector(".header-modif")
console.log(title)

let token = window.localStorage.getItem("token")
if (!token) {
    console.log("Aucun utilisateur connecté.")
    title.classList.remove("none")
    filter.classList.remove("none")
    headermodif.classList.add("none")
    titlemodif.classList.add("none")
    console.log(titlemodif)

    login.addEventListener("click", function ()  {
        window.location = "./login.html"
    })
} else {
    console.log("Utilisateur Connecté")
    login.textContent = "logout"
    title.classList.add("none")
    filter.classList.add("none")
    headermodif.classList.remove("none")
    titlemodif.classList.remove("none") 
    
    login.addEventListener("click", function ()  {
        login.textContent = "login"
        window.localStorage.removeItem("token")
        window.location = "./index.html"
    })
}

