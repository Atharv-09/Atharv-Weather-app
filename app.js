

const express = require("express")
const https = require("https") //not need to install because it is native
const bodyParser = require("body-parser")

const app = express()


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){ //this res is from our server to client browser

    res.sendFile(__dirname+"/index.html");

})


app.post("/",function(req,res){

  const query = req.body.cityName;//take the input value and pass as an query
  const id = "b8396d72fd8d57a2351d9b95f84ec44d";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+id+"&units="+unit;

  https.get(url,function(response){ //this response is from other server to our server
      console.log(response.statusCode);

      response.on("data",function(data){  //console.log(data);we gwt text in hexdecimal form
      const weatherdata = JSON.parse(data)
      console.log(weatherdata)
      const temp = weatherdata.main.temp
      const weatherDescription = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon

      const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

      // console.log(weatherDescription)
      // const weatherdata1 = JSON.stringify(data) -->converts our code i.e -{_} \n -{_} into string i.e in one line {_ : _ , _ : _ }

      //this res is from our server to browser
      res.write("<p>The weather is currently "+weatherDescription+ "<p>");
      res.write("<h1>The Temperature in "+query+" is "+temp+" degree celcius</h1>")
      res.write("<img src="+ imageurl +">")

      res.send()
  })
  })

})

app.listen(3000,function(){
  console.log("Server is On At 3000")
})
