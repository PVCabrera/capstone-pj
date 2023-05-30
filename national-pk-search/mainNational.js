// onload run the main function
window.onload = main;

let selectedStateByUser = "";
let selectedParkType = "";

// function which runs state Drop-down
function main() {
  loadStatesDropdownList();
  loadParksDropdownList();
}

// ---------------------------------------------------------------------

// Search By State

function loadStatesDropdownList() {
  const selectStateElement = document.querySelector("#state-selection");
  selectStateElement.onchange = stateChange;

  for (const state of locationsArray) {
    const option = document.createElement("option");
    option.value = state;
    option.innerText = state;
    selectStateElement.append(option);
  }
}

function stateChange() {
  selectedStateByUser = document.querySelector("#state-selection").value;
  filterData();
  changeBg();
}
 
// ----------------------------------------------------------------------

// Search By Park

function loadParksDropdownList() {
  const selectParkTypeElement = document.querySelector("#park-type");
  selectParkTypeElement.onchange = parkChange;

  for (const park of parkTypesArray) {
    const option = document.createElement("option");
    option.value = park;
    option.innerText = park;
    selectParkTypeElement.append(option);
  }
}

function parkChange() {
  selectedParkType = document.querySelector("#park-type").value;
  filterData();
}

// ----------------------------------------------------------------------

// Filter Data

function filterData() {
  const parentElement = document.querySelector("main");
  parentElement.replaceChildren();

  let filteredData = nationalParksArray;

  if (selectedStateByUser && selectedParkType) {
    filteredData = filteredData.filter(
      (parkObject) =>
        parkObject.State === selectedStateByUser &&
        parkObject.LocationName.includes(selectedParkType)
    );
  } else if (selectedStateByUser) {
    filteredData = filteredData.filter(
      (parkObject) => parkObject.State === selectedStateByUser
    );
  } else if (selectedParkType) {
    filteredData = filteredData.filter((parkObject) =>
      parkObject.LocationName.includes(selectedParkType)
    );
  }

  filteredData.forEach((element) => {
    const parkDeets = document.createElement("div");
    parkDeets.classList.add("parkDeets");

    const localName = document.createElement("h2");
    localName.innerText = element.LocationName;
    parkDeets.appendChild(localName);

    const localCity = document.createElement("p");
    localCity.innerText = `City: ${element.City}`;
    parkDeets.appendChild(localCity);

    const localState = document.createElement("p");
    localState.innerText = `State: ${element.State}`;
    parkDeets.appendChild(localState);

    const localAddress = document.createElement("p");
    localAddress.innerText = `Address: ${element.Address}`;
    parkDeets.appendChild(localAddress);

    if (element.Visit !== undefined) {
      const elementVisit = document.createElement("p");
      const visitLink = document.createElement("a");
      visitLink.href = element.Visit;
      visitLink.innerHTML = `<a href="${element.Visit}" target="_blank">${element.Visit}</a>`;
      elementVisit.appendChild(visitLink);
      parkDeets.appendChild(elementVisit);
    }

    const button = document.createElement("button");
    button.id = element.LocationID;
    button.classList.add("btn", "btn-dark");
    button.innerText = "View Photo";
    button.addEventListener("click", function (event) {
      buttonClick(element.LocationID);
      event.stopPropagation();
    });
    parkDeets.appendChild(button);

    const buttonHolder = document.createElement("div")
    buttonHolder.classList.add("buttonDiv")
    buttonHolder.appendChild(button)
    parkDeets.appendChild(buttonHolder)
   
    // Appends all extracted that were added to the div to the main tag (IMPORTANT)
    parentElement.appendChild(parkDeets);
  });
}

// Change Background on State Change

function changeBg() {
  let stateSelection = document.querySelector("#state-selection");
  let selectedState = stateSelection.value;
  
  let imagesLocArray = locationsArray.find((item) => item === selectedState);
  
  if (imagesLocArray) {
    let imageUrl = `./states-bg-img/${selectedState}.jpg`;
    console.log('imageUrl:', imageUrl);
    document.getElementById("bg").style.backgroundImage = `url('${imageUrl}')`;
  } else {
    console.log('No matching state name found.');
  }
}

function buttonClick(parkID) {
  console.log(parkID)
  // Create the menu container
  const menuContainer = document.createElement("div");
  menuContainer.classList.add("menu-container");

  // Create the blurred background
  const blurredBackground = document.createElement("div");
  blurredBackground.classList.add("blurred-background");
  menuContainer.appendChild(blurredBackground);

  // Create the menu content
  const menuContent = document.createElement("div");
  menuContent.classList.add("menu-content");

  // Create the photo card
  const photoCard = document.createElement("div");
  photoCard.classList.add("card");

  let filterPhoto = nationalParksArray;

  const photoObj = filterPhoto.filter((photo) => photo.LocationID == parkID);
  // console.log(photoObj)

  // Gets the photo from the array
  const photoName =
    photoObj[0]["Image"] != null ? photoObj[0]["Image"]: "./state-img/user.png";
  console.log(photoObj[0]["Image"])

  // Create the card image
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.setAttribute("src", photoName);
  // console.log(photoName);
  cardImage.alt = "Park Photo";
  photoCard.appendChild(cardImage);

  // Append the photo card to the menu content
  menuContent.appendChild(photoCard);

  // Append the menu content to the menu container
  menuContainer.appendChild(menuContent);

  // Append the menu container to the document body
  document.body.appendChild(menuContainer);

  // Close the menu when clicking outside the menu content
  blurredBackground.addEventListener("click", function (event) {
    if (event.target === blurredBackground) {
      menuContainer.remove();
    }
  });
}
