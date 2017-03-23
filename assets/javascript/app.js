// Initialize Firebase
var config = {
    apiKey: "AIzaSyANO-_yR3pCa_s66SMgYXkq8W68Giei9_g",
    authDomain: "train-time-2922e.firebaseapp.com",
    databaseURL: "https://train-time-2922e.firebaseio.com",
    storageBucket: "train-time-2922e.appspot.com",
    messagingSenderId: "860536961290"
};
firebase.initializeApp(config);

var database = firebase.database();

// on click function
$("#addTrain").on("click", function(event) {

    event.preventDefault();

    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("x");
    var frequency = $("#frequency").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,

    });

    // shoe alert message that train has been added successfuly
    alert("New Train successfully added");

    // empty the data inouts

    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");


})


// 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var firstTrain = childSnapshot.val().firstTrain;
        var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, "m").format("hh:mm A");
        console.log(remainder);
        console.log(minutes);
        console.log(arrival);


        $("tbody").append("<tr>" +
                "<td>" + name + "</td>" +
                "<td>" + destination + "</td>" +
                "<td>" + frequency + "</td>" +
                "<td>" + arrival + "</td>" +
                "<td>" + minutes) + "</td>" +

            "</tr>+";

    },
    function(errorObject) {

    });

/*
var name = $("#name").val().trim();
var destination = $("#destination").val().trim();
var time = moment($("#time").val().trim(), "HH:mm").subtract(10, "years").format("x");
var frequency = $("#frequency").val().trim();
var remainder = moment().diff(moment.unix(time), "minutes") % frequency;
var minutesAway = frequency - remainder
var arrival = moment().add(minutes, "m").format("hh:mm A");


// 2. Button for adding a Train
$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    console.log("hello");
    // Grabbed values from text boxes
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    frequency = $("#frequency").val().trim();
    minutesAway = ((currentTime - time) / 60).toString();
    console.log(minutesAway);

    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        minutesAway: minutesAway,

    });
    alert("New Train successfully added");
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");



});

// 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

        $("tbody").append("<tr>" +
                "<td>" + childSnapshot.val().name + "</td>" +
                "<td>" + childSnapshot.val().destination + "</td>" +
                "<td>" + childSnapshot.val().frequency + "</td>" +
                "<td>" + childSnapshot.val().arrival + "</td>" +

                "<td>" + childSnapshot.val().minutesAway) + "</td>" +

            "</tr>+";

    },
    function(errorObject) {



    });
    */
