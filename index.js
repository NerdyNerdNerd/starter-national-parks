// const firstBtn = document.querySelector("button");

// firstBtn.addEventListener("click", function (event) {
//   console.log(event.target.parentNode);
// });



//function add numberParksOnDisplay
const numberOfParksOnDisplay = () =>{
    // create a new element with text to display the current number of parks on display in the header
//select all the park display elements
const parks = document.querySelectorAll(".park-display");
//get teh number of parks using the length property
const numberParks = parks.length;
//create a new div element to hold the number of parks
const newElement = document.createElement("div");
//set teh text of the newElement div
newElement.innerText = `${numberParks} exciting parks to visit`;
//add the header-statement css class to the newEmelent
newElement.classList.add("header-statement");
//add the newElement to the page
const header = document.querySelector("header");
header.appendChild(newElement);
};

//function to show elipsed descriptions
const shortenDescription = () => {
    //display the elipsed description to the page
    const descriptions = document.querySelectorAll(".description-display");
    for (let desc of descriptions.values()) {
      let content = desc.innerText;
    
      if (content.length > 250) {
        content = content.slice(0, 250);
        content = content + "...";
      }
    
      desc.innerText = content;
    }
  
};

//function to add a link to the elipsed description
const addLinkToDescription = () =>{
    const descriptions = document.querySelectorAll(".description-display");
//display a link to allow user to expand to see the full description
for (let desc of descriptions.values()) {
    let content = desc.innerText;
  
    if (content.length > 250) {
      content = content.slice(0, 250);
      content = content + `<a href="#">...</a>` ;
    }
  
    //desc.innerText = content;
    desc.innerHTML = content;
  }
};

//function to style the rating if above 4.7
const rateParksStyle = () => {

  //get all the rating elements with class of value
  const ratings = document.querySelectorAll(".rating-display .value");

  //check if the park rating is above 4.7 and update the style by adding the high-rating css class to it
  for (let rating of ratings) {
    let ratingValue = parseFloat(rating.innerText);
  
    if (ratingValue > 4.7) {
      rating.classList.add("high-rating");
      //rating.classList.remove("value");
    }
    if (ratingValue < 4.7) {
        rating.classList.add("low-rating");
        //rating.classList.remove("value");
    }
  }
};

// function to handler favorite button clicks
const favoriteButtonClickHandler = (event) => {
    const park = event.target.parentNode;
    park.style.backgroundColor = "#c8e6c9";
  };
  
  // function for sorting by name
  const sortByName = (parkA, parkB) => {
    const parkAName = parkA.querySelector("h2").innerText;
    const parkBName = parkB.querySelector("h2").innerText;
    if (parkAName < parkBName) {
      return -1;
    } else if (parkAName > parkBName) {
      return 1;
    } else {
      return 0;
    }
  };
  
  // function for sorting by rating
  const sortByRating = (parkA, parkB) => {
    const parkARating = parseFloat(
      parkA.querySelector(".rating-display > .value").innerText
    );
    const parkBRating = parseFloat(
      parkB.querySelector(".rating-display > .value").innerText
    );
    return parkBRating - parkARating;
  };
  
  // function for handling the nameSorter click
  const nameSorterClickHandler = (event) => {
    event.preventDefault();
  
    // 1.  get the main element
    const main = document.querySelector("main");
  
    // 2. get the list of parks
    const parksList = main.querySelectorAll(".park-display");
  
    // 3. empty the main
    main.innerHTML = "";
  
    // 4. create an array
    const parksArray = Array.from(parksList);
  
    // 5. sort the array
    parksArray.sort(sortByName);
  
    // 6. Insert each park into the DOM
    parksArray.forEach((park) => {
      main.appendChild(park);
    });
  };
  
  // function to handle the ratingSorter click
  const ratingSorterClickHandler = (event) => {
    event.preventDefault();
  
    // 1.  get the main element
    const main = document.querySelector("main");
  
    // 2. get the list of parks
    const parksList = main.querySelectorAll(".park-display");
  
    // 3. empty the main
    main.innerHTML = "";
  
    // 4. create an array
    const parksArray = Array.from(parksList);
  
    // 5. sort the array
    parksArray.sort(sortByRating);
  
    // 6. Insert each park into the DOM
    parksArray.forEach((park) => {
      main.appendChild(park);
    });
  };

  //validate the number is a number
  function validateNumber(value) {
    return !isNaN(value);
  };
  
  //validate the number is within the given range 1-5
  function validateRange(value, min, max) {
    return value >= min && value <= max;
  };

  const submitHandler = (event) => {
    // Prevent default behavior of refreshing the page
    event.preventDefault();
    //Get the submitted form data
    const form = event.target;
    const formData = new FormData(form);
  
    const errors = validateForm(formData);
  
    // Clear all previous errors
    const errorElements = document.querySelectorAll(".error");
    for (let element of errorElements) {
      element.style.display = "none";
    }
  
    // Display any new errors
    Object.keys(errors).forEach((key) => {
      // Find the specific error element
      const errorElement = document.querySelector(`#${key}-form .error`);
      errorElement.innerHTML = errors[key];
      errorElement.style.display = "block";
    });

// If there are no errors
if (!Object.keys(errors).length) {
    // Create a new element
    const parkSection = document.createElement("section");
  
    // Add the park class
    parkSection.classList.add("park-display");
  
    // Construct the HTML for this element
    const content = `
      <h2>${formData.get("name")}</h2>
      <div class="location-display">${formData.get("location")}</div>
      <div class="description-display">${formData.get("description")}</div>
      <button class="rate-button" title="Add to Favourites">&#9734;</button>
      <div class="stats">
        <div class="established-display stat">
          <h3>Established</h3>
          <div class="value">${moment(formData.get("established")).format(
            "MMMM D, YYYY"
          )}</div>
        </div>
        <div class="area-display stat">
          <h3>Area</h3>
          <div class="value">${formData.get("area")}</div>
        </div>
        <div class="rating-display stat">
          <h3>Rating</h3>
          <div class="value">${formData.get("rating")}</div>
        </div>
      </div>
      `;
  
    // Set the innerHTML
    parkSection.innerHTML = content;
  
    // Append to the main element
    document.querySelector("main").appendChild(parkSection);
  }

};
//validate input in required fields function
function validateExists(value) {
    return value && value.trim();
  };
  
  //the main validation function
  function validateForm(formData) {
    const errors = {};
  
    // Check if name was entered
    if (!validateExists(formData.get("name"))) {
      errors.name = "Please enter a name";
    }
  
    // Check if rating was entered
    if (!validateExists(formData.get("rating"))) {
      errors.rating = "Please enter a rating";
    }
  
    // Check if description was entered
    if (!validateExists(formData.get("description"))) {
      errors.description = "Please enter short description";
    }
  
    // Check if established date was entered
    if (!validateExists(formData.get("established"))) {
      errors.established = "Please enter date";
    }
  
    // Check if area was entered
    if (!validateExists(formData.get("area"))) {
      errors.area = "Please enter the area of the park";
    }
  
    // Check if location date was entered
    if (!validateExists(formData.get("location"))) {
      errors.location = "Please enter the location of the park";
    }

      // Check if rating was entered
  if (!validateExists(formData.get("rating"))) {
    errors.rating = "Please enter a rating";
  } else {
    // Check if the rating is a number
    if (!validateNumber(formData.get("rating"))) {
      errors.rating = "Rating must be a number";
    } else {
      // Because it is a number, convert it
      const rating = Number.parseFloat(formData.get("rating"));
      // Check that the rating is between 1 and 5, inclusive
      if (!validateRange(rating, 1, 5)) {
        errors.rating = "Rating must be between 1 and 5 inclusive";
      }
    }
  }
  
    return errors;
  };

  // the point where all the code starts
  const main = () => {
    // select the nameSorter link
    const nameSorter = document.querySelector("#name-sorter");
  
    // add an event listener
    nameSorter.addEventListener("click", nameSorterClickHandler);
  
    // select the ratingSorter link
    const ratingSorter = document.querySelector("#rating-sorter");
  
    // add an event listener
    ratingSorter.addEventListener("click", ratingSorterClickHandler);
  
    // select all the buttons for all the parks
    const allBtns = document.querySelectorAll(".rate-button");
  
    // iterate the list of buttons and add an event handler to each
    allBtns.forEach((btn) => {
      btn.addEventListener("click", favoriteButtonClickHandler);
    });

    // Get the form element
    const form = document.querySelector("#park-form");

    // attach the submit handler
    form.addEventListener("submit", submitHandler);

    numberOfParksOnDisplay();
    shortenDescription();
    addLinkToDescription();
    rateParksStyle();
  };
  
  // Add event listener for DOMContentLoaded
  window.addEventListener("DOMContentLoaded", main);