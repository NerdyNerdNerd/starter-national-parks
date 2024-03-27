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

  const submitHandler = (event) => {
    // Prevent default behavior of refreshing the page
    event.preventDefault();
    //log message to console to verify it submitted
    console.log("the form was submitted");
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