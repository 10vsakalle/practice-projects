/* variable declaration*/
const searchInput = document.getElementById("search-Input");
const submitButton = document.querySelector("#Submit");
const searchLocation = document.getElementById("search-location");
const locationRadius = document.getElementById("location-radius");
const signupBlock = document.getElementsByClassName("signUp")[0];
const jobCardParent = document.getElementsByClassName("container")[0];
const pageHeading = document.getElementsByClassName("Page-heading")[0];
const mobileNav = document.getElementsByClassName("mobileNav")[0];
const burgerMenu = document.getElementsByClassName("burgerMenu")[0];

/* Event Listeners */

//Search Submit Button Event Listener
submitButton.addEventListener("click", () => {
    
  let searchResData = [];
  var userInput = searchInput.value.toString();
  var userLocation = searchLocation.value.toString();
  
  //alert user in case of NO INPUT
  if (searchInput.value == "" || searchLocation.value == "") {
    alert("Do you want to specify job title or location?");
  }
  //if location is provided, converting place to lattitude and longitude
  if (searchLocation.value) {
    
    let key = "	96pUPw4bBjFiujAvfxI3nojetoKNzgwU";
    let url = `http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${userLocation}`;
    console.log(url);

    fetchData(url).then((data) => {
       lat = data.results[0].locations[0].latLng.lat.toString();
      lng = data.results[0].locations[0].latLng.lng.toString();
      full = lat +","+ lng;
      geturlAndData(full);
    });
    
  }

  else{
    var url = `https://api.joblocal.de/v4/search-jobs?search.query=${userInput}`;
    console.log(url);
    fetchData(url).then((data) => {
      searchResData = data.included;
      renderData(data.included);
    });
}
  signupBlock.style.display = "none";
});

//Search Similar Jobs Button Event Listener
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList == "similarJobButton") {
    let searchResData = [];
    var id = e.target.id.toString();
    console.log(id);
    var url = `https://api.joblocal.de/v4/search-jobs/results/${id}/similar-jobs`;
    console.log(url);
    jobCardParent.innerHTML = "";
    pageHeading.innerHTML = `<h3> We've found you similar jobs: `;

    fetchData(url).then((data) => {
      searchResData = data.data;
      console.log(data.data);
      renderData(data.data);
    });
  }
});

//Responsive Mobile burger menu event listener
burgerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (window.getComputedStyle(mobileNav).display === "none") {
    mobileNav.style.display = "block";
  } else if (mobileNav.style.display === "block") {
    mobileNav.style.display = "none";
  }
});

/* Helper functions */

function renderData(obj) {
  let data = obj;
  console.log(data.length);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    //creating job display div element

    const newDiv = document.createElement("div");
    newDiv.classList.add("jobCards");
    const newDivTextNode = document.createTextNode("Sample");
    newDiv.appendChild(newDivTextNode);

    const html = `
        <h4 class="linkColors" style="font-weight: bold;">${data[i].attributes.title}</h4>
        <h5>${data[i].attributes.company.name}</h5>
        <h5>${data[i].attributes.location.city}</h5>

        <p style="font-weight: bold;">Employement type</p>
        <p>${data[i].attributes.employmentTypes[0].title}</p>
    
        <p style="font-weight: bold;">Responsibilities</p>
        <p>${data[i].attributes.responsibilities}</p>

        <p style="font-weight: bold;">Requirements</p>
        <p>${data[i].attributes.requirements}</p>

        <p style="font-weight: bold;">Qualification</p>
        <p>${data[i].attributes.qualifications[0].title}</p>
        </div>

    `;

    newDiv.innerHTML = html;
    jobCardParent.appendChild(newDiv);

    // Creating similar job display button

    const newButton = document.createElement("button");
    newButton.classList.add("similarJobButton");
    const newButtonTextNode = document.createTextNode("Show Similar Jobs");
    newButton.appendChild(newButtonTextNode);
    newButton.id = data[i].id;
    console.log(newButton.id);
    newDiv.appendChild(newButton);
  }
}

function geturlAndData(param) {
  let latLng = param;
  let searchResData = [];
  var userInput = searchInput.value.toString();
  var url = `https://api.joblocal.de/v4/search-jobs?search.query=${userInput}&search.location=${latLng}`;
  console.log(url);
  fetchData(url).then((data) => {
    searchResData = data.included;
    renderData(data.included);
  });
}


// Generic Fetch Function

function fetchData(url) {
  return fetch(url).then((res) => res.json());
}
