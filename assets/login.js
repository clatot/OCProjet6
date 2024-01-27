const form = document.querySelector("form")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    console.log("Submit!")

    const mail = document.getElementById("email").value
    const password = document.getElementById("password").value

    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    const chargeUtile = JSON.stringify(user)
    console.log(chargeUtile)

    const reponse = fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    }).then(reponse => reponse.json())
    .then ((response) => {
        if (!response.token) {
            alert("Identifiant ou mot de   passe incorrect");
            return;
        }
        const token = JSON.stringify(response.token)
        console.log(token)
        window.localStorage.setItem("token", token)
        window.location = "./index.html"
    })
})
