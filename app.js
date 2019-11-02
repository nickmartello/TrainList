let firebaseConfig = {
    apiKey: "AIzaSyD7Dgl__SyXQZzK5dLIjbHUQTRzawpx7_M",
    authDomain: "test-project-edc3f.firebaseapp.com",
    databaseURL: "https://test-project-edc3f.firebaseio.com",
    projectId: "test-project-edc3f",
    storageBucket: "test-project-edc3f.appspot.com",
    messagingSenderId: "983955988208",
    appId: "1:983955988208:web:84992e162d8e5dfab16c35"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();


$(".btn-submit").on("click", function (event) {
    event.preventDefault();

    let name = $("#trainName").val().trim();
    let destination = $("#destination").val().trim();
    let startTime = $("#startTime").val().trim();
    let frequency = $("#frequency").val().trim();



    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency
    })

    return false;

});


database.ref().on("child_added", function (childSnapshot) {

    let childName = childSnapshot.val().name;
    let childDestination = childSnapshot.val().destination;
    let childStartTime = childSnapshot.val().startTime;
    let childFrequency = childSnapshot.val().frequency;


    let minAway;
    let firstNewTrain = moment(childStartTime, "hh:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstNewTrain), "minutes");
    let remainder = diffTime % childFrequency;



    minAway = childFrequency - remainder;

    let nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    let newRow = `
    <tr>
                    <td>${childName}</td>
                    <td>${childDestination}</td>
                    <td>${childFrequency}</td>
                    <td>${nextTrain}</td>
                    <td>${minAway} mins</td>
    </tr>`

    $("tbody").append(newRow);
});



