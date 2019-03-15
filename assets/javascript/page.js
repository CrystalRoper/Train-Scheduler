var recordCount = 0;

var config = {
    apiKey: "AIzaSyCuFjI7PR1gBW2htJqD-xNGeNXZuV032b4",
    authDomain: "train-scheduler-94077.firebaseapp.com",
    databaseURL: "https://train-scheduler-94077.firebaseio.com",
    storageBucket: "train-scheduler-94077.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

$("#addBtn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destinationName").val().trim();
    var firstTrain = $("#arrivalTime").val().trim();
    var frequency = $("#arrivalFrequency").val().trim();

    recordCount = 0;

    database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

    $("#trainName").val("");
    $("#destinationName").val("");
    $("#arrivalTime").val("");
    $("#arrivalFrequency").val("");
});

database.ref().on("child_added", function (document) {
    recordCount += 1;
    var name = document.val().name;
    var destination = document.val().destination;
    var frequency = document.val().frequency;
    var firstTrain = document.val().firstTrain;
    var arrivalMinutes;
    var arrivalTime;
    var trainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    var minuteDifference = moment().diff(moment(trainTime), "minutes");
    var remainder = minuteDifference % frequency;
    arrivalMinutes = frequency - remainder;
    var nextTrain = moment().add(arrivalMinutes, "minutes");
    arrivalTime = moment(nextTrain).format("hh:mm");


    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(arrivalTime),
            $("<td>").text(arrivalMinutes)
        )
    );
});
