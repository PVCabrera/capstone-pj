// onload run the main function
window.onload = main;

// function which runs state Drop-down
function main() {
  loadStatesDropdownList(locationsArray)
  addStatesToDropdownList()
  loadParksDropdownList(locationsArray)
  addParksToDropdownList()
}
// ---------------------------------------------------------------------

// Search By State

function loadStatesDropdownList(locationArrayStateSelections) {
  let stateNames = "";
  for (i = 0; i < locationArrayStateSelections.length; i += 1) {
    const stateString = locationArrayStateSelections[i]
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
  const matchedPark = filterParkData(selectedState);
  console.log(selectedState);
  // Replace selections on change
  parentElement.replaceChildren();

  matchedPark.forEach((element) => {
    let locationItem = document.createElement("p");
    let locationItemText = document.createTextNode(
      `${element.LocationName}\n${element.City}\n
      ${element.State}\n${element.Address}\n
      ${element.Visit}`

      // if (element.Visit === undefined) {
      //   delete element.Visit;
      // }
    );

    locationItem.append(locationItemText);
    parentElement.append(locationItem);
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
    const parkString = parkTypesArrayParkSelections[i]
    parkTypes += `<option value=${parkString}>${parkString}</option>`;
  }
  return parkTypes;
}

function addParksToDropdownList() {
  const selectParkElement = document.querySelector("#park-type");

  selectParkElement.innerHTML = loadParksDropdownList(parkTypesArray);

  selectParkElement.onchange = parkChange;
}

function parkChange(changeEvent) {
  const parentElement = document.querySelector("main");
  const selectedParkByUser = changeEvent.target.value;
  const matchedParkType = filterParkTypeByData(selectedParkByUser);
  console.log(selectedParkByUser);

  // Replace selections on change
  parentElement.replaceChildren();

  matchedParkType.forEach((element) => {
    let locationItem = document.createElement("p");
    let locationItemText = document.createTextNode(
      `${element.LocationName}\n${element.City}\n
      ${element.State}\n${element.Address}\n
      ${element.Visit}`
    );
    // Adds elements and text node to each other
    locationItem.append(locationItemText);
    parentElement.append(locationItem);
  });
}

function filterParkTypeByData(selectedParkByUser) {
  const parksByParkType = nationalParksArray.filter(
    (parkObject) => parkObject.LocationName.includes(selectedParkByUser)
  );
  return parksByParkType;
}

// -------------------------------------------------------------------------

// Search using both boxes



