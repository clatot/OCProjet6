// Génération liste Works
let reponse = await fetch("http://localhost:5678/api/works")
let works = await reponse.json()
console.log(works)

// Génération galerie 
function genererWorks(works) {
    const galerie = document.querySelector(".gallery")
    for (let i = 0; i < works.length; i++) {
        let workId = works[i].id;
        galerie.innerHTML += `
            <figure >
                <img src="${works[i].imageUrl}"></img>
                <figcaption data-id="${workId}">${works[i].title}</figcaption>
            </figure>
        `
    }
}

genererWorks(works)

// Comportement Filtres
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

//Comportement Authentification Token 
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

// Comportement modal

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
    refreshPhotoForm();
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
 
async function OpenModalGallery () {
    let worksDiv = document.querySelector(".modal-works")
    worksDiv.innerHTML = ""
    console.log(works)
    console.log(worksDiv.innerHTML)
    for (let i = 0; i < works.length; i++) {
        let workId = works[i].id;
        worksDiv.innerHTML += `
            <figure>
                <img class="work" src="${works[i].imageUrl}" data-id="${workId}"></img>
                <img class="trash" src="./assets/icons/trash-can-solid.svg" data-id="${workId}"></img>
            </figure>
        ` 
    }
    modalGallery.showModal();

    const trashcan = document.querySelectorAll(".trash") 
    for (let i = 0; i < trashcan.length; i++) {
        trashcan[i].addEventListener("click", function() {
        deleteWork(trashcan[i].dataset.id);
        });
    }
    modalPhoto.close();
}

function OpenModalPhoto () {
    modalGallery.close();
    modalPhoto.showModal();
}

function closeModal () {
    modalGallery.close();
    modalPhoto.close();
}

// Delete Works 
async function deleteWork(id) {
    let userToken = JSON.parse(localStorage.getItem("token"));
    console.log(id)
    const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    })
    if (reponse.ok) {
        console.log("Image supprimée avec succès");
        
        const reponse = await fetch("http://localhost:5678/api/works")
        works = await reponse.json()

        RefreshWork(id);
    }
}

function RefreshWork (id) {
    let deletedWork = document.querySelectorAll('[data-id]');
    for (let i = 0; i < deletedWork.length; i++) {
        if (deletedWork[i].dataset['id'] === id) {
            let parentWork = deletedWork[i].parentNode;
            parentWork.remove();
        }
    }
    
}

const SendPhotoForm = document.querySelector(".modal-form");
const inputFile = document.querySelector("#image")
const inputTitre = document.querySelector("#titre")
const inputCategorie = document.querySelector("#categorie")
const imagePreview = document.querySelector(".modal-box .modal-file-container img")
const buttonLabel = document.querySelector(".modal-box .modal-file-container button")
const spanLabel = document.querySelector(".modal-box .modal-file-container span")
inputFile.addEventListener("change", (event) => {
    let file = event.target.files[0];
    if (file.size > 4 * 1024 * 1024) {
        alert("Le fichier est trop volumineux.");
        inputFile.value = "";
        return;
    }

    const fileFormats = ["image/jpeg", "image/png"]
    if (!fileFormats.includes(file.type)) {
        alert("Le format du fichier n'est pas autorisé.");
        inputFile.value = "";
        return;
    }
    
    if (inputFile.files.length > 0) {
        const file = inputFile.files[0];
        const objectURL = URL.createObjectURL(file);
        imagePreview.src = objectURL;
        buttonLabel.classList.add("none");
        spanLabel.classList.add("none");
        imagePreview.classList.add("filled");
    } else {
        refreshPhotoForm()
    }
 });

 function refreshPhotoForm () {
    imagePreview.src = "./assets/icons/placeholder.svg";
    buttonLabel.classList.remove("none");
    spanLabel.classList.remove("none");
    imagePreview.classList.remove("filled");
    inputFile.value = "";
    inputTitre.value = "";
    inputCategorie.value = "";
 }

SendPhotoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addWork();
    closeModal();
})

async function addWork() {
    let userToken = JSON.parse(localStorage.getItem("token"));
    const file = document.getElementById("image").files[0];
    const title = document.getElementById("titre").value;
    const category = document.getElementById("categorie").value;
    console.log(file)
    console.log(title)
    console.log(category)

    let formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1], pair[2])
    }

    const reponse = await fetch(`http://localhost:5678/api/works/`, {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${userToken}`,
        },
        body: formData,
    });
    if (reponse.ok) {
        console.log("Image Ajoutée avec succès");
        refreshPhotoForm();
    }
}