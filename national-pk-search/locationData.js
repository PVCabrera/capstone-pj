const locationsArray = [
  "select your state below",
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "DC",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Islands",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

function loadStatesDropdownList(locationArrayStateSelections) {
  let stateNames = "";
  for (i = 0; i < locationArrayStateSelections.length; i += 1) {
    stateNames += `<option>${locationArrayStateSelections[i]}</option>`;
  }
  return stateNames;
}

function addStatesToDropdownList() {
  const selectStateElement = (document.querySelector("#state-selection").innerHTML =
  loadStatesDropdownList(locationsArray));
  selectStateElement.onchange = stateChange;
}

