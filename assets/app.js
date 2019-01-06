
var update = function() {
    $(".dateTime").html(moment().format("MMMM Do YYYY, HH:mm:ss"));
}
setInterval(update, 1000);

var config = {
    apiKey: "AIzaSyB5Bh6C98xvIUWUBQ97BmInGAidvNTA0SU",
    authDomain: "databasedecember22.firebaseapp.com",
    databaseURL: "https://databasedecember22.firebaseio.com",
    projectId: "databasedecember22",
    storageBucket: "databasedecember22.appspot.com",
    messagingSenderId: "85074819988"
 };

  firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "ttrainorary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  };
  
  // Uploads trainloyee data to the database
  database.ref().push(newTrain);

  $("#train-name-input").text(newTrain.name);
  $("#destination-input").text(newTrain.dest);
  $("#first-train-time-input").text(newTrain.first);
  $("#frequency-input").text(newTrain.freq);


  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq; 

    var firstTrainTimePretty = moment.unix(firstTrain).format("HH:mm");

//code to try
var tFrequency = frequency;

// user input for first train time
var firstTime = firstTrainTimePretty;

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(tFrequency, "minutes");


// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrainTimePretty),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
      );
    
      // Append the new row to the table
      $("#train-table > tbody").append(newRow);


      
    });