let addToy = false;

function createCardElement(toy){

let card = document.createElement("div")
card.classList.add("card")


let h2 = document.createElement("h2")
h2.textContent = toy.name

let img = document.createElement("img")
img.src = toy.image
img.classList.add("toy-avatar")

let p = document.createElement("p")
p.textContent = `${toy.likes} Likes`

let button = document.createElement("button")
button.classList.add("like-btn")
button.id = toy.id
button.textContent = "Like ❤️"
button.addEventListener("click", () => { 
  //e.preventDefault() 
  p.textContent = `${toy.likes += 1} Likes`
  updateLikes(toy.id, toy.likes)

})

// document.body.append(card)

card.append(h2, img, p, button)
document.getElementById("toy-collection").appendChild(card)
}



function sendItOut(newToy){

  fetch('http://localhost:3000/toys', {
    method : 'POST',
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json"
    },
    body : JSON.stringify({
      "name": newToy.name,
      "image": newToy.image,
      //or instead of repeting newToy.bla, you can write ...newToy
      "likes": 0
    })
  })
    .then(response=> response.json())
    .then(responseToy => createCardElement(responseToy))
  
  }
  



function updateLikes(id, newNumberOfLikes){
  
  fetch(`http://localhost:3000/toys/${id}`, {
    method : "PATCH",
    headers : 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
      // .then(res => res.json())
      // .then(data => console.log(data))

  })
}




document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(toys=>{
    toys.forEach(toy=>createCardElement(toy))
  })



  let form = document.querySelector("form.add-toy-form")
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    sendItOut(formData)
})



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



































// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });
