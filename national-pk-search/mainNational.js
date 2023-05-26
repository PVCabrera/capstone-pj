// onload run the main function
window.onload = main;

// function which runs state Drop-down
function main() {
  loadStatesDropdownList();
  loadParksDropdownList();
}
// ---------------------------------------------------------------------

// Search By State

function loadStatesDropdownList() {
  const selectStateElement = document.querySelector("#state-selection");
  console.log("selectStateElement:", selectStateElement);

  selectStateElement.onchange = stateChange;

  for (const state of locationsArray) {
    console.log("state:", state);
    const option = document.createElement("option");
    option.value = state;
    option.innerText = state;
    selectStateElement.append(option);
  }
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

function filterParkData(selectedStateByUser) {
  const parksByState = nationalParksArray.filter(
    (parkObject) => parkObject.State === selectedStateByUser
  );
  return parksByState;
}

// ----------------------------------------------------------------------

// Search By Park

function loadParksDropdownList() {
  const selectStateElement = document.querySelector("#park-type");
  console.log("selectStateElement:", selectStateElement);

  selectStateElement.onchange = parkChange;

  for (const park of parkTypesArray) {
    console.log("park:", park);
    const option = document.createElement("option");
    option.value = park;
    option.innerText = park;
    selectStateElement.append(option);
  }
}

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

    // if (element.Visit !== undefined) {
    //   const elementVisit = document.createElement("p");
    //   const visitLink = document.createElement("a");
    //   elementVisit.innerText = `Visit: ${element.Visit}`;
    //   parkDeets.appendChild(elementVisit);
    // }

    if (element.Visit !== undefined) {
      const elementVisit = document.createElement("p");
      const visitLink = document.createElement("a");
      visitLink.href = element.Visit;
      visitLink.textContent = "Visit";
      visitLink.addEventListener("click", function() {
        window.open(visitLink.href, "_blank");
      });
      elementVisit.appendChild(visitLink);
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
