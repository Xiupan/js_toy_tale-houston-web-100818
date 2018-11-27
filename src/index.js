const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const newToyName = document.querySelector('#new-toy-name-field')
const newToyImg = document.querySelector('#new-toy-img-field')

let addToy = false

const render = () => {
  fetch('http://localhost:3000/toys')
  .then((r) => {
    return r.json()
  }).then((data) => {
    toyCollection.innerHTML = ''
    console.log(data);

    for (let a = 0; a < data.length; a++) {
      let toyCard = document.createElement('div')
      toyCard.className = 'card'

      let h2Toy = document.createElement('h2')
      h2Toy.innerHTML = data[a].name

      let imgToy = document.createElement('img')
      imgToy.className = 'toy-avatar'
      imgToy.src = data[a].image

      let likesToy = document.createElement('p')
      likesToy.innerHTML = `${data[a].likes} likes`

      let likesButtonToy = document.createElement('button')
      likesButtonToy.className = 'like-btn'
      likesButtonToy.innerHTML = 'Like <3'
      likesButtonToy.addEventListener('click', () => {
        increaseLikes(data[a])
      })

      toyCard.appendChild(h2Toy)
      toyCard.appendChild(imgToy)
      toyCard.appendChild(likesToy)
      toyCard.appendChild(likesButtonToy)
      toyCollection.appendChild(toyCard)
    }
  })
}

const newToy = () => {
  fetch(`http://localhost:3000/toys/`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: newToyName.value,
      image: newToyImg.value,
      likes: 0
    })
  }).then(render)
}

const increaseLikes = (toy) => {
  let currentLikes = toy.likes
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      likes: currentLikes + 1
    })
  }).then(render)
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', (e) => {
      e.preventDefault()
      newToy()
    })
  } else {
    toyForm.style.display = 'none'
  }
})

render()
