const express=require("express");
const https=require("https");//using native https we can also use axios instead....
const app=express();
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded ({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
});
app.post("/",function(req,res){
  const city=req.body.cityname
  const url="https://api.openweathermap.org/data/2.5/weather?appid=583d0e682401940eedf7757bce562f26&q="+city+""
  https.get(url,function(response){
    console.log(response.statusCode); //status returns 200 means ok if problem return 404 error
  response.on("data",function(data){
    const weatherdata=JSON.parse(data); //this will data in terminal without hexadecimal code...
    console.log(weatherdata);
    const temperature=weatherdata.main.temp;//this will access object inside object to get some piece of info
    console.log(temperature);//shows particular categorized result....
    const icon=weatherdata.weather[0].icon; //finds icon for proper weather
    const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";//sets icon on between + signs..
    res.write("hello console is running");
    res.write("<h1>The temperature at "+city+" is" +temperature+"yes</h1>");
    res.write("<img src='"+imageurl+"'>");

    res.send();//above write is used when we want to print more than one send command...
  });
});

});








app.listen(3000,function(){
  console.log("server is running 3000");
});
