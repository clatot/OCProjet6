// Appel API GET works
let response = await fetch("http://localhost:5678/api/works");
let works = await response.json();

// Appel API GET works
let responseCategories = await fetch("http://localhost:5678/api/categories");
let categories = await responseCategories.json();
console.log(categories)

// Fonction Génération galerie 
function genererWorks(works) {
    const galerie = document.querySelector(".gallery");
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

// Mise en place Galerie 
genererWorks(works);

// Fonction Génération Filtres 
function genererFilter() {
    const filter = document.querySelector(".filter")
    for (let i = 0; i < categories.length; i++) {
        filter.innerHTML += `
            <p>${categories[i].name}</p>
        `
    }
}

genererFilter();

// Variables Filtres
const boutonsFiltrer = document.querySelectorAll(".filter > p");
let workList = "";

// Fonctions Deselectionner tout les filtres
function unselectFilter (element) {
    element.forEach((e) => {
        e.classList.remove("selected");
    })
}

// Bouton Activation Filtres
function eventListenerFilter (element) {
    element.forEach((e, index) => {
        e.addEventListener("click", function() {
            boutonFilter(index);
        })
    })
}

// Fonction Filtres
function boutonFilter(index) {
    if (index === 0) {
        workList = works;
    } else {
    workList = works.filter(function (work) {
        return work.categoryId === index;
    })};
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workList);

    unselectFilter(boutonsFiltrer);
    boutonsFiltrer[index].classList.add("selected");
}

// Mise en place Filtres
eventListenerFilter(boutonsFiltrer);

// Variable Token 
const login = document.querySelector("#login");
const title = document.querySelector("#portfolio-title");
const filter = document.querySelector(".filter");
const titlemodif = document.querySelector("#portfolio-modifier");
const headermodif = document.querySelector(".header-modif");
let token = window.localStorage.getItem("token");

// Vérification Token 
if (!token) {
    title.classList.remove("none");
    filter.classList.remove("none");
    headermodif.classList.add("none");
    titlemodif.classList.add("none");

    login.addEventListener("click", function ()  {
        window.location = "./login.html"
    });
} else {
    login.textContent = "logout";
    headermodif.classList.remove("none");
    titlemodif.classList.remove("none");
    title.classList.add("none");
    filter.classList.add("none");
    
    
    login.addEventListener("click", function ()  {
        login.textContent = "login"
        window.localStorage.removeItem("token")
        window.location = "./index.html"
    });
}

// Variable Modals
const modalGallery = document.querySelector(".modal1");
const modalPhoto = document.querySelector(".modal2");
const modalGalleryContent = document.querySelector(".modal1-content");
const modalPhotoContent = document.querySelector(".modal2-content");
const modalOpenButton = document.querySelector(".modal-open-button");
const modalCloseButton = document.querySelectorAll(".modal-close-button");
const modalGoPhoto = document.querySelector(".modal-go-photo");
const modalGoGallery = document.querySelector(".modal-go-gallery");

// Bouton ouvre la modale a partir du DOM
modalOpenButton.addEventListener("click", () => {
    OpenModalGallery ();
})

// Bouton Ouvre la fenetre Photo
modalGoPhoto.addEventListener("click", () => {
    refreshPhotoForm();
    OpenModalPhoto ();
})

// Bouton Ouvre la fenetre gallery
modalGoGallery.addEventListener("click", () => {
    OpenModalGallery ();
})

// Bouton ferme la modale actuelle
modalCloseButton.forEach((button) => {
    button.addEventListener("click", closeModal);
});

// Ferme modale clique en dehors de la modale Gallery
modalGallery.addEventListener("click", (event) => {
    if (event.target === modalGallery) {
        modalGallery.close();
    }
});

// Ferme modale clique en dehors de la modale Photo
modalPhoto.addEventListener("click", (event) => {
    if (event.target === modalPhoto) {
        modalPhoto.close();
    }
});

// Fonction Ouvre la modale 1 Gallery 
async function OpenModalGallery () {
    let worksDiv = document.querySelector(".modal-works")
    worksDiv.innerHTML = ""
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

// Fonction Ouvre la modale 2 Photo
function OpenModalPhoto () {
    modalGallery.close();
    modalPhoto.showModal();
}

// Fonction Ferme toutes les modals 
function closeModal () {
    modalGallery.close();
    modalPhoto.close();
}


// Appel API Suppression Work
function deleteWork(idWork) {
    let userToken = JSON.parse(localStorage.getItem("token"));
    fetch(`http://localhost:5678/api/works/${idWork}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            console.log("test")
            throw Error(response.status);
        }
    })
    .then(() => {
        if (response.ok) {
            for (let i = 0; i < works.length; i++) {
                if (works[i].id == idWork) {
                    works.splice(i, 1)
                }
            }
            let deletedWork = document.querySelectorAll('[data-id]');
            for (let i = 0; i < deletedWork.length; i++) {
                if (deletedWork[i].dataset['id'] === idWork) {
                    let parentWork = deletedWork[i].parentNode;
                    parentWork.remove();
                }
            }
        }
    })
    .catch(error => alert(error));
}

//Variable Modal Form
const SendPhotoForm = document.querySelector(".modal-form");
const inputFile = document.querySelector("#image")
const inputTitre = document.querySelector("#titre")
const inputCategorie = document.querySelector("#categorie")
const imagePreview = document.querySelector(".modal-box .modal-file-container img")
const buttonLabel = document.querySelector(".modal-box .modal-file-container button")
const spanLabel = document.querySelector(".modal-box .modal-file-container span")

// Vérification validation des input du form 
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

// Reset Modal Form 
function refreshPhotoForm () {
    imagePreview.src = "./assets/icons/placeholder.svg";
    buttonLabel.classList.remove("none");
    spanLabel.classList.remove("none");
    imagePreview.classList.remove("filled");
    inputFile.value = "";
    inputTitre.value = "";
    inputCategorie.value = "";
}

// Bouton Validation Modal Form 
SendPhotoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addWork();
    closeModal();
})

// Appel API Ajout de Projet
async function addWork() {
    let userToken = JSON.parse(localStorage.getItem("token"));
    const file = document.getElementById("image").files[0];
    const title = document.getElementById("titre").value;
    const category = document.getElementById("categorie").value;

    let formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    const response = await fetch(`http://localhost:5678/api/works/`, {
        method: "POST",
        headers: { 
            Authorization: `Bearer ${userToken}`,
        },
        body: formData,
    })
    .then (response => {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response.json();
    })
    .then((addedWork) => {
        works.push(addedWork)
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(works)

        refreshPhotoForm();
    })
    .catch(error => alert("Erreur : " + error));
};