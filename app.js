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
//create a variable to reference the database
let database = firebase.database();




//on click function for the submit button
$(".btn-submit").on("click", function (event) {
    event.preventDefault();

    let name = $("#trainName").val().trim();
    let destination = $("#destination").val().trim();
    let startTime = $("#startTime").val().trim();
    let frequency = $("#frequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency
    })
    //don't refresh the page
    return false;

});

//firebase watcher and initial loader.
database.ref().on("child_added", function (childSnapshot) {
    //set childSnapshot to variables
    let childName = childSnapshot.val().name;
    let childDestination = childSnapshot.val().destination;
    let childStartTime = childSnapshot.val().startTime;
    let childFrequency = childSnapshot.val().frequency;
    console.log(childStartTime);
    // //create a moment object
    let minAway;
    //change the year so the first train comes before now
    let firstNewTrain = moment(childStartTime, "hh:mm").subtract(1, "years");
    //difference between the current and first train
    let diffTime = moment().diff(moment(firstNewTrain), "minutes");
    let remainder = diffTime % childFrequency;
    //minutes until next train
    minAway = childFrequency - remainder;
    //next train time 
    let nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    let newRow = `<tr>
                    <td>${childName}</td>
                    <td>${childDestination}</td>
                    <td>${childFrequency}</td>
                    <td>${nextTrain}</td>
                    <td>${minAway} mins</td>
    </tr>`
    //append content to the display table
    $("tbody").append(newRow);
});
