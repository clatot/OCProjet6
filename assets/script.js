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
const modalWindow = document.querySelector("#modal")

const modalOpen = function (e) {
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal","true");
    modal.addEventListener("click", modalClose);
    modal.querySelector(".modal-close").addEventListener("click", modalClose);
    modal.querySelector(".modal-stop").addEventListener("click", stopPropagation);
    console.log(modal)
}

const modalClose = function (e) {
    if (modal === null) return
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", modalClose);
    modal.querySelector(".modal-close").removeEventListener("click", modalClose);
    modal.querySelector(".modal-stop").removeEventListener("click", stopPropagation);
    modal.innerHTML = ""
    modal = null;
    console.log(modal)
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

function modalContentGallery() {
    modal.innerHTML= 
        `
        <div class="modal-wrapper modal-stop">
            <button class="modal-close">Fermer</button>
            <h2 id="titlemodal1">Galerie photo</h2>
            <div class="works">
            </div>
        </div>
        `
    let worksDiv = document.querySelector(".works")
    for (let i = 0; i < works.length; i++) {
        worksDiv.innerHTML += `
            <figure>
                <img src="${works[i].imageUrl}"></img>
                <img class="trash" src="./assets/icons/trash-can-solid.svg"></img>
            </figure>
        `
    }
    const trashcan = document.querySelectorAll(".trash") 
    console.log(trashcan)
    for (let i = 0; i < trashcan.length; i++) {
        trashcan[i].addEventListener("click", function() {
            deleteWork(i);
        });
    }
}

function modalContentPhoto() {
    `
    <div class="modal" role="dialog" aria-modal="false" aria-labelledby="titlemodal1" style="display: none;">
        <div class="modal-wrapper modal-stop">

        </div>
    </div>
    `
}

const modalLink = document.querySelector(".modal-link")
modalLink.addEventListener("click", a => {
    a.preventDefault();
    modal = modalWindow;
    modalContentGallery();
    modalOpen();
})

    
function deleteWork(id) {
    const userToken = localStorage.getItem("token");
    console.log(userToken)
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "delete",
        headers: {
            Authorization: `Bearer ${userToken}`,
        }
    }
)}