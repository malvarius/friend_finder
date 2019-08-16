var express = require('express');
var path = require('path');
var app = express();
// process.env.POT in case another port added
var PORT = process.env.PORT || 3000 || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// array of people to compare to
var newPerson = null;
var peopleArray= [
    {
    name: 'Billy bob',
    email: 'billy@bob.com',
    questions:[2,2,3,2,2],
    points:0,
    picture: "data:image/jpeg;base64,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"
    },
    {
        name: 'Billy Jean',
        email: 'billy@jean.com',
        questions:[5,5,5,5,5],
        points:0,
        picture: "data:image/jpeg;base64,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"
    },
    {
        name: 'Billy Bueller',
        email: 'billy@bueller.com',
        questions:[3,3,3,3,3],
        points:0,
        picture: "data:image/jpeg;base64,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"
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
  app.get("/api/match",function(req,res){
      return res.json(peopleSearch(newPerson));
  });
// function to see who is most similar in peopleArray
function peopleSearch (newguy){
    var pointsArray = []
    pointsArray = [];
    for (var j=0;j<3;j++){
    for(var i=0;i<newguy.questions.length;i++){
        if(Math.abs(peopleArray[j].questions[i]-newguy.questions[i])<2){
            peopleArray[j].points+=2;
        }else if(Math.abs(peopleArray[j].questions[i]-newguy.questions[i])<3){
            peopleArray[j].points++
        }
    }pointsArray.push(peopleArray[j].points)
    console.log(pointsArray);
} var mostPointsPerson=peopleArray[pointsArray.indexOf(Math.max(...pointsArray))]
return mostPointsPerson
}

app.post("/api/survey", function(req, res) {
    newPerson = req.body;
    peopleArray.push(newPerson);
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
