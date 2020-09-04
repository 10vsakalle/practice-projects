const allBreeds = document.getElementById('breeds');
const cards = document.querySelector('.card');
const form = document.querySelector('form');

function fetchData(url){
  return  fetch(url)
    .then(checkStatus) 
    .then(res => res.json())
}

fetchData('https://dog.ceo/api/breeds/list')
.then(data => showOptions(data.message))

fetchData('https://dog.ceo/api/breeds/image/random')
.then(data => showImage(data.message))

function showImage(data){
    const html = `
    <img src="${data}" alt>
    <p>Click here to see more ${allBreeds.value}</p>
    `;
    cards.innerHTML = html;
}

function showOptions(data){
    const select = data.map(item => `
    <option value='${item}'>${item}</option>
  `).join('');
    
  allBreeds.innerHTML = select;

}

function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

function fetchBreedImage() {
    const breed = allBreeds.value;
    const img = cards.querySelector('img');
    const p = cards.querySelector('p');
    
    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(data => {
        img.src = data.message;
        img.alt = breed;
        p.textContent = `Click on the picture to view more ${breed}s`;
      })
  }

allBreeds.addEventListener('change', fetchBreedImage);
cards.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);
    //document.getElementById('name').value = '';
    //document.getElementById('comment').value = '';


function postData(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, comment }) 
    }
    
    fetch('https://jsonplaceholder.typicode.com/comments', config)
      .then(checkStatus)
      .then(res => res.json())
      .then(data => console.log(data))
  }
