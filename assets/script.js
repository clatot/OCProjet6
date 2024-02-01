const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()
console.log(works)


function genererWorks(works) {
    const galerie = document.querySelector(".gallery")
    for (let i = 0; i < works.length; i++) {
        galerie.innerHTML += `
            <figure>
                <img src="${works[i].imageUrl}"></img>
                <figcaption>${works[i].title}</figcaption>
            <figure>
        `
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
    headermodif.classList.remove("none")
    titlemodif.classList.remove("none") 
    title.classList.add("none")
    filter.classList.add("none")
    
    
    login.addEventListener("click", function ()  {
        login.textContent = "login"
        window.localStorage.removeItem("token")
        window.location = "./index.html"
    })
}

let modal = null;

const modalOpen = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal","true");
    modal.addEventListener("click", modalClose);
    modal.querySelector(".modal-close").addEventListener("click", modalClose);
    modal.querySelector(".modal-stop").addEventListener("click", stopPropagation);
}

const modalClose = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", modalClose);
    modal.querySelector(".modal-close").removeEventListener("click", modalClose);
    modal.querySelector(".modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

const modalLien = document.querySelectorAll(".modal-link").forEach(a => {
    a.addEventListener("click", modalOpen)
})    
    
