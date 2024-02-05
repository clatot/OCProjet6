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

const boutonsFiltrer = document.querySelectorAll(".filter > p");
let workList = "";

function unselectFilter (element) {
    element.forEach((e) => {
        e.classList.remove("selected")
    })
}

function eventListenerFilter (element) {
    element.forEach((e, index) => {
        e.addEventListener("click", function() {
            boutonFilter(index);
        })
    })
}

function boutonFilter(index) {
    console.log(index)
    
    if (index === 0) {
        workList = works
    } else {
    workList = works.filter(function (work) {
        return work.categoryId === index;
    })};
    document.querySelector(".gallery").innerHTML = ""
    genererWorks(workList)

    unselectFilter(boutonsFiltrer);
    boutonsFiltrer[index].classList.add("selected")
}

eventListenerFilter(boutonsFiltrer);

const login = document.querySelector("#login")
const title = document.querySelector("#portfolio-title")
const filter = document.querySelector(".filter")
const titlemodif = document.querySelector("#portfolio-modifier")
const headermodif = document.querySelector(".header-modif")

let token = window.localStorage.getItem("token");

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

const modalGallery = document.querySelector(".modal1")
const modalPhoto = document.querySelector(".modal2")
const modalGalleryContent = document.querySelector(".modal1-content")
const modalPhotoContent = document.querySelector(".modal2-content")
const modalOpenButton = document.querySelector(".modal-open-button")
const modalCloseButton = document.querySelectorAll(".modal-close-button")
const modalGoPhoto = document.querySelector(".modal-go-photo")
const modalGoGallery = document.querySelector(".modal-go-gallery")

modalOpenButton.addEventListener("click", () => {
    OpenModalGallery ();
})

modalGoPhoto.addEventListener("click", () => {
    OpenModalPhoto ();
})

modalGoGallery.addEventListener("click", () => {
    OpenModalGallery ();
})

modalCloseButton.forEach((button) => {
    button.addEventListener("click", closeModal);
});

modalGallery.addEventListener("click", (event) => {
    if (event.target === modalGallery) {
        modalGallery.close();
    }
});

modalPhoto.addEventListener("click", (event) => {
    if (event.target === modalPhoto) {
        modalPhoto.close();
    }
});
 
function OpenModalGallery () {
    let worksDiv = document.querySelector(".modal-works")
    worksDiv.innerHTML = ""
    for (let i = 0; i < works.length; i++) {
        worksDiv.innerHTML += `
            <figure>
                <img class="work" src="${works[i].imageUrl}"></img>
                <img class="trash" src="./assets/icons/trash-can-solid.svg"></img>
            </figure>
        `
    }
    modalGallery.showModal();

    const trashcan = document.querySelectorAll(".trash") 
    console.log(trashcan)
    for (let i = 0; i < trashcan.length; i++) {
        trashcan[i].addEventListener("click", function() {
        deleteWork(i+1);
        });
    }
}

function OpenModalPhoto () {
    modalGallery.close();
    modalPhoto.showModal();
}

function closeModal () {
    modalGallery.close();
    modalPhoto.close();
}

async function deleteWork(id) {
    let userToken = localStorage.getItem("token");
    userToken = JSON.parse(userToken);
    console.log(token)
    console.log(id)
    const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    })
    if (reponse.ok) {
        console.log("Image supprimée avec succès")
        document.querySelector(".gallery").innerHTML = ""
        genererWorks(works)
    }
}
