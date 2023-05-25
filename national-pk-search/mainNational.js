// onload run the main function
window.onload = main;

// function which runs state Drop-down
function main() {
  loadStatesDropdownList(locationsArray);
  addStatesToDropdownList();
  loadParksDropdownList(locationsArray);
  addParksToDropdownList();
}
// ---------------------------------------------------------------------

// Search By State

function loadStatesDropdownList(locationArrayStateSelections) {
  let stateNames = "";
  for (i = 0; i < locationArrayStateSelections.length; i += 1) {
    const stateString = locationArrayStateSelections[i];
    stateNames += `<option value=${stateString}>${stateString}</option>`;
  }
  return stateNames;
}

function addStatesToDropdownList() {
  const selectStateElement = document.querySelector("#state-selection");

  selectStateElement.innerHTML = loadStatesDropdownList(locationsArray);

  selectStateElement.onchange = stateChange;
}

function stateChange(changeEvent) {
  const parentElement = document.querySelector("main");
  const selectedState = changeEvent.target.value;
  const matchedState = filterParkData(selectedState);
  console.log(selectedState);
  // Replace selections on change
  parentElement.replaceChildren();

  matchedState.forEach((element) => {
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
      elementVisit.innerText = `Visit: ${element.Visit}`;
      parkDeets.appendChild(elementVisit);
    }
    parentElement.appendChild(parkDeets);
  });
}

function filterParkData(selectedState) {
  const parksByState = nationalParksArray.filter(
    (parkObject) => parkObject.State === selectedState
  );
  return parksByState;
}

// ----------------------------------------------------------------------

// Search By Park

function loadParksDropdownList(parkTypesArrayParkSelections) {
  let parkTypes = "";
  for (i = 0; i < parkTypesArrayParkSelections.length; i += 1) {
    const parkString = parkTypesArrayParkSelections[i];
    parkTypes += `<option value=${parkString}>${parkString}</option>`;
  }
  return parkTypes;
}

function addParksToDropdownList() {
  const selectParkElement = document.querySelector("#park-type");

  selectParkElement.innerHTML = loadParksDropdownList(parkTypesArray);

  selectParkElement.onchange = parkChange;
}

// Park Change Event
// -------------------------------------------------------------------

function parkChange(changeEvent) {
  const parentElement = document.querySelector("main");
  const selectedParkByUser = changeEvent.target.value;
  const matchedParkType = filterParkTypeByData(selectedParkByUser);
  console.log(selectedParkByUser);

  // Replace selections on change
  parentElement.replaceChildren();

  matchedParkType.forEach((element) => {
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
      elementVisit.innerText = `Visit: ${element.Visit}`;
      parkDeets.appendChild(elementVisit);
    }
    parentElement.appendChild(parkDeets);
  });
}

function filterParkTypeByData(selectedParkByUser) {
  const parksByParkType = nationalParksArray.filter((parkObject) =>
    parkObject.LocationName.includes(selectedParkByUser)
  );
  return parksByParkType;
}

// -------------------------------------------------------------------------

// Search using both boxes

// function selectedPark() {
//   const selectedPark = document.querySelector("#parks").value;
//   const selectedState = document.querySelector("#state").value;

//   const parkDisplayData = filterParkData(selectedPark, selectedState);
//   displayData(parkDisplayData);
// }

// function selectedState() {
//   const selectedPark = document.querySelector("#parks").value;
//   const selectedState = document.querySelector("#state").value;

//   const stateDisplayData = filterStateData(selectedState, selectedPark);
//   displayData(stateDisplayData);
// }
