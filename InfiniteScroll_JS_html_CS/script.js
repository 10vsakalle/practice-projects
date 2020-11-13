const buttonLoad = document.getElementById("loadMore");
const divToAdd = document.getElementsByClassName("container");
const parentContainer = document.getElementsByClassName("container-full")

buttonLoad.addEventListener('click', (e) =>{
    e.target.style.display = 'none';
} )

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    console.log( { scrollTop, scrollHeight, clientHeight });
    
    if(clientHeight + scrollTop >= scrollHeight - 5 && buttonLoad.style.display == 'none') {
      addDataToDOM();
      }
  });

  function addDataToDOM() {
   // create New Element
    const newDiv = document.createElement("div");

    //add class to element
    newDiv.classList.add("container");

    //add text node to new element and it will be inner HTML of newly created element. to replace inner content with another element's inner HTML later, you will have to have something between the tags

    const newDivTextNode = document.createTextNode("Sample");
    newDiv.appendChild(newDivTextNode);

    //replacing innerHTML
   newDiv.innerHTML = divToAdd[0].innerHTML;

   //Appending it to Div tag
    parentContainer[0].appendChild(newDiv);
}

