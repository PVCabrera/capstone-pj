// onload run the main function
window.onload = main;

// function which runs state Drop-down
function main() {
  loadMoutainsDropdownList();
}

// --------------------------------------------------------
// Mountain Page JS
function loadMoutainsDropdownList() {
  const selectElement = document.querySelector("#mountain-selection");
  // selectElement.onchange = mountainChange;

  for (const mountain of mountainsArray) {
    const option = document.createElement("option");

    option.value = mountain.name;
    option.innerText = mountain.name;

    selectElement.append(option);
  }
}

function mountainChange(usersChange) {
  console.log(usersChange.target.value);
  const mountainFromUser = usersChange.target.value;

  const selectedMountainByUser = (mountain) =>
    mountain.name === mountainFromUser;
  const selectedMountain = mountainsArray.find(selectedMountainByUser);

  const parentElement = document.querySelector("main");

  parentElement.replaceChildren();

  // for (const path of selectedAlbum.paths) {
  //   // VISUALIZE THE GOAL: <img class="card" src="insert-image-path-here">

  //   // 1. Create the empty element by tag name:
  //   const imageElement = document.createElement("img");

  //   // 2. Customize it in some way:
  //   imageElement.setAttribute("src", `images/${selectedAlbumFolder}/${path}`);
  //   imageElement.classList.add("img-thumbnail", "gallery-image");

  //   // 3. Add it to an existing branch on the DOM tree:
  //   parentElement.append(imageElement);
  // }

  console.log(parentElement);
}
