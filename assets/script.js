const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()
console.log(works);

const galerie = document.querySelector(".gallery")

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
 