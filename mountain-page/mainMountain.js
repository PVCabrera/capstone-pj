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
  const dataResults = document.querySelector('#times');
  
  for (const mountain of mountainsArray) {
    if (currentMountain === mountain.name) {
      let mountainHTML = `<div class="card">
        <img src="mountain-images/${mountain.img}" class="card-img-top" alt="mountain-images">
        <h5 class="card-title">${mountain.name}</h5>
        <div class="card-body">
          <p class="card-text">${mountain.desc}</p>
          <p class="card-text">The mountain effort is <strong>${mountain.effort}</strong>!</p>
          <p class="card-text">Latitude: ${mountain.coords.lat}</p>
          <p class="card-text">Longitude: ${mountain.coords.lng}</p>
        </div>
        <div id="times" class="card-footer text-muted">
          Fetching sunrise and sunset times...
        </div>
      </div>`;
      
      mountainInfo.innerHTML = mountainHTML;
      
      // Fetch the sunset/sunrise times for a specific mountain
      getSunsetForMountain(mountain.coords.lat, mountain.coords.lng).then((data) => {
        const sunriseTime = data.results.sunrise;
        const sunsetTime = data.results.sunset;
        const timesElement = document.querySelector("#times");
        timesElement.innerHTML = `<p class="card-text">The current sunrise time is ${sunriseTime}.</p>
          <p class="card-text">The current sunset time is ${sunsetTime}.</p>`;
      });
      
      break; // Exit the loop since we found the matching mountain
    }
  }
}

async function getSunsetForMountain(lat, lng) {
  let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  let data = await response.json();
  return data;
}


