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

var name = "";
var destination = "";
var time = "";
var frequency = "";
var minutesAway = "";
var total = "";

// 2. Button for adding a Train
$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    console.log("hello");
    // Grabbed values from text boxes
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    frequency = $("#frequency").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        minutesAway: minutesAway,
    });


});

// 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

        $("tbody").append("<tr>" +
                "<td>" + childSnapshot.val().name + "</td>" +
                "<td>" + childSnapshot.val().destination + "</td>" +
                "<td>" + childSnapshot.val().frequency + "</td>" +
                "<td>" + childSnapshot.val().time + "</td>" +

                "<td>" + childSnapshot.val().minutesAway) + "</td>" +

            "</tr>+";

    },
    function(errorObject) {



    });
