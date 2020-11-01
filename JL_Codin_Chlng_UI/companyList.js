/* Variable Declaration*/

const companyCardParent = document.getElementsByClassName("container-full")[0];

/* Event Listeners */

window.addEventListener("load", () => {
  fetchData("https://api.joblocal.de/v4/search-companies").then((data) => {
    renderData(data.data);
    console.log(data);
  });
});

/* Helper functions */

function renderData(obj) {
  let data = obj;

  for (let i = 0; i < data.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("jobCards");
    const newDivTextNode = document.createTextNode("Sample");
    newDiv.appendChild(newDivTextNode);

    const html = `
        <h4 class="linkColors" style="font-weight: bold;">${data[i].attributes.name}</h4>
        <h5>${data[i].attributes.address.street}, ${data[i].attributes.address.zipcode}, ${data[i].attributes.address.city}</h5>
        <h5>Employees : ${data[i].attributes.employees}</h5>

    `;
    newDiv.innerHTML = html;
    companyCardParent.appendChild(newDiv);
  }
}

function fetchData(url) {
  return fetch(url).then((res) => res.json());
}
