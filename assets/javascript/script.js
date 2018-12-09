
 var stillURL;
 var animatedURL;


// Initial array of movies
var gifs = ["hilarious", "life", "swag", "fails", "funny", "cats", "dogs", "lizards", "lions", "Obama", "Trump", "Shaq", "Labron James", "Westbrook", "Michael Jordan",  "Kevin Hart", "Will Smith"];

// Function for displaying gif data
function renderButtons() {

  // Deleting the buttons prior to adding new buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#gifs-view").empty();

  // Looping through the array of gifs
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each gif in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("giphy");

    //adding float to gif
    // Adding a data-attribute with a value of the gif at index i
    a.attr("data-name", gifs[i]);
    console.log(gifs[i]);
    // Providing the button's text with a value of the gif at index i
    a.text(gifs[i]);

    console.log(a);
    // Adding the button to the HTML
    $("#gifs-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var gif = $("#gif-input").val().trim();
  // The movie from the textbox is then added to our array
  gifs.push(gif);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});

$("body").on("click", ".giphy", function() {
  
  event.preventDefault();

  // Grabbing and storing the data-animal property value from the button
  var element = $(this).attr("data-name");
  console.log(element);

  // This is our API key
  var APIKey = "fDO1Y6m3sjNn2pksWOqV88QME9ZFNtXN";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +    
    element + "&api_key="+APIKey+"&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var elementDiv = $("<div>");
        elementDiv.attr("class", "clicker");
        elementDiv.css("background-color","lightgrey");
        elementDiv.css("border","solid 1px black");


        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());

        
        
        
        
        
        
        
        
        
        // Creating and storing an image tag
        var elementImage = $("<img>");
        
        stillURL=results[i].images.fixed_height_still.url
        animatedURL=results[i].images.fixed_height.url;

        // Setting the src attribute of the image to a property pulled off the result item
        elementImage.attr("src", animatedURL);

        //adding float to div
        elementDiv.css("float", "left");
        elementDiv.css("margin", "10px");
        console.log(elementDiv);

        // Appending the paragraph and image tag to the animalDiv
        elementDiv.append(p);
        elementDiv.append(elementImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(elementDiv);
      }
    });
});

$("body").on("click", ".clicker" ,function() {

  var state = $(this).attr("data-state","animate");

  console.log(state);
  console.log(stillURL);


  if (state === "animate") {
    $(this).attr("src", stillURL);
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", animatedURL);
    $(this).attr("data-state", "animate");
  }
});




/*function displayMovieInfo() {
    
     // This is our API key
    var APIKey = "fDO1Y6m3sjNn2pksWOqV88QME9ZFNtXN";

    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key="+APIKey+"limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the movie
      var gifDiv = $("<div class='gif'>");

      // Storing the rating data
      var rate = response.rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rate);

      // Displaying the rating
      gifDiv.append(pOne);

      // Retrieving the URL for the image
      var imgURL = response.images;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      gifDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#gifs-view").prepend(gifDiv);
    });

  }*/

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

