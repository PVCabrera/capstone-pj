// onload run the main function
window.onload = main;

// function which runs state Drop-down
function main() {
  loadMountainsDropdownList();
}

// --------------------------------------------------------
// Mountain Page JS
function loadMountainsDropdownList() {
  const selectElement = document.querySelector("#mountain-selection");
  selectElement.onchange = mountainChange;

  for (const mountain of mountainsArray) {
    // creates a new tag for options
    const option = document.createElement("option");

    // adds the values to the html option tag
    option.value = mountain.name;
    option.innerText = mountain.name;
    
    // adds option to eachother from the array
    selectElement.append(option);
  }
}

function mountainChange() {
  const selectElement = document.querySelector("#mountain-selection");
  const mountainInfo = document.querySelector("main");
  const currentMountain = selectElement.value;

  for (const mountain of mountainsArray) {
    if (currentMountain === mountain.name) {
      mountainInfo.innerHTML = `<img src = "mountain-images/${mountain.img}"> ${mountain.desc} 
      The effort for this hike is <strong>${mountain.effort}</strong>! <br><br>Latitude: ${mountain.coords.lat} 
      <br>Longitude: ${mountain.coords.lng}`;
    }
  }
}

