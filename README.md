* to try https://nickmartello.github.io/TrainList/

# TRAIN LIST

In this project we used Firebase, a noSQL cloud-hosted database. Moment.js was also used to get real time data for our train schedules. 

## What it does

Enter the name of the Train, destination, frequency of when it comes, and then finally the time the train first arrives. It will appear on the list above and show you in real time when the next train will arrive.


sample code below
```javascript
database.ref().on("child_added", function (childSnapshot) {

    let childName = childSnapshot.val().name;
    let childDestination = childSnapshot.val().destination;
    let childStartTime = childSnapshot.val().startTime;
    let childFrequency = childSnapshot.val().frequency;


    let minAway;
    let firstNewTrain = moment(childStartTime, "hh:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstNewTrain), "minutes");
    let remainder = diffTime % childFrequency;


        
     
 

