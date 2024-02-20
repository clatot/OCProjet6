// Variable Login 
const form = document.querySelector("form");
const project = document.querySelector("#nav-projets")

// Mise en place page login + Appel API POST
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    const chargeUtile = JSON.stringify(user);

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    }).then(response => response.json())
    .then ((response) => {
        if (!response.token) {
            alert("Identifiant ou mot de passe incorrect");
            return;
        };
        const token = JSON.stringify(response.token);
        window.localStorage.setItem("token", token);
        window.location = "./index.html";
    })
});

// Revenir a la page d'accueil 
project.addEventListener("click", function ()  {
    window.location = "./index.html"
});