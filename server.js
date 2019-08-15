var express = require('express');
var path = require('path');
var app = express();
// process.env.POT in case another port added
var PORT = process.env.PORT || 3000 || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// array of people to compare to
var peopleArray= [
    {
    name: 'Billy bob',
    email: 'billy@bob.com',
    questions:[2,2,3,2,2],
    points:0
    },
    {
        name: 'Billy Jean',
        email: 'billy@bueller.com',
        questions:[5,5,5,5,5],
        points:0
    },
    {
        name: 'Billy Bueller',
        email: 'billy@bob.com',
        questions:[3,3,3,3,3],
        points:0
    }
]
// home route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
});
app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/public/home.html"));
});
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/survey.html"));
  });
  app.get("/api/survey", function(req, res) {
   return res.json(peopleArray)
  });
// function to see who is most similar in peopleArray
function peopleSearch (personObject){
    var pointsArray = []
    for (var j=0;j<peopleArray[0].questions.length;j++){
        for(var i=0;i<peopleArray[0].questions.length;i++){
            if (Math.abs(peopleArray[j].questions[i]-peopleArray[peopleArray.length-1].questions[i])<3){
                peopleArray[j].points+=1;
            }else if(Math.abs(peopleArray[j].questions[i]-peopleArray[peopleArray.length-1].questions[i])<4){
            peopleArray[j].points+=1;
        }else{
        }
    }
}
}
app.post("/api/survey", function(req, res) {
    var newAddition= req.body;
    peopleArray.push(newAddition)
   });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  module.exports={
      app:app,
      path:path,
      PORT:PORT,
      express:express
  }
