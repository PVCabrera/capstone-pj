// onload run the main function
window.onload = main;

let selectedState = "";
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
  selectedState = document.querySelector("#state-selection").value;
  filterData();
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

  if (selectedState && selectedParkType) {
    filteredData = filteredData.filter(
      (parkObject) =>
        parkObject.State === selectedState &&
        parkObject.LocationName.includes(selectedParkType)
    );
  } else if (selectedState) {
    filteredData = filteredData.filter((parkObject) => parkObject.State === selectedState);
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
      visitLink.innerHTML = `Visit: <a href="${element.Visit}" target="_blank">${element.Visit}</a>`;
      elementVisit.appendChild(visitLink);
      parkDeets.appendChild(elementVisit);
    }

    parentElement.appendChild(parkDeets);
  });
}







