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
    $("#firstTrain").val("");
    $("#frequency").val("");


})


// 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var firstTrain = childSnapshot.val().firstTrain;
        var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
        var minutes = (frequency - remainder);
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
setTimeout(function() {
    window.location.reload(1);
}, 60 * 1000);
