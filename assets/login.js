const form = document.querySelector("form")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    console.log("Submit!")

    const mail = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(mail)
    console.log(password)

    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    const chargeUtile = JSON.stringify(user)
    console.log(chargeUtile)

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    }) 

    console.log(localStorage.token)

    // window.location.href = "./index.html"
})