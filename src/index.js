
const toyUrl = "http://localhost:3000/toys"
const collectionDiv = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')

getToys()

addToyForm.addEventListener('submit', addNewToy)

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Get toys 
function getToys(){
  fetch(toyUrl)
  .then(resp => resp.json())
  .then(toyCollection => toyCollection.forEach(renderToys))
}

//Render toys
function renderToys(toy){
    
    let cardDiv = document.createElement('div')
    cardDiv.setAttribute('class', 'card')

    let h2 = document.createElement('h2')
    h2.textContent = toy.name

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.textContent = `${toy.likes} Likes`

    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn') 
    btn.setAttribute('id', toy.id) 
    btn.textContent = "Like <3"

    cardDiv.append(h2, img, p, btn)

    collectionDiv.appendChild(cardDiv)


    btn.addEventListener('click', updateLikes)


}

//Add new toys to form
function addNewToy(e){
  e.preventDefault()
  // console.log(e)
  let h2 = e.target[0].value
  let img = e.target[1].value
  let newToy = {name: h2, image: img, likes: 0}

fetch(toyUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newToy),
})
  .then(renderToys(newToy))
}


//Event Listener button click, like a toy, update database abd render info to DOM
function updateLikes(e) {
    console.log(e)
  //   let toyId = e.target.dataset.id
  //   let update = e.target
  //   let newlikes = {likes: update}

  //   fetch(`http://localhost:3000/toys/${toyId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //   },
  //     body: JSON.stringify(newLikes),
  // })
}