// onload run the main function
window.onload = main;

// function which runs state Drop-down
function main() {
  loadStatesDropdownList(locationsArray)
  addStatesToDropdownList()
  stateChange(nationalParksArray)
}

// function generateParkOptions (event) {
//   const parentElement = document.querySelector("main");
//   console.log(parentElement);
//   console.log(event.target.value)

//   const locationDataState = event.target.value

//   const stateSelectionByUserChoice = (pickedState) =>
//     pickedState.State === locationDataState

//   const usersSelectedState = nationalParksArray.filter(locationDataState)
// }

