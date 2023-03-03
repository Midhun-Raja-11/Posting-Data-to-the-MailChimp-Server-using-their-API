const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/",function(req,res){
     let fName = req.body.fName;
     let lName = req.body.lName;
     let eMail = req.body.eMail;

     var data = {
        members : [
            {
                email_address : eMail,
                status : "subscribed",
                merge_fields : {
                        FNAME : fName,
                        LNAME : lName
                }
            }
        ]
     };

     let jsonData = JSON.stringify(data);

     let url = "https://us12.api.mailchimp.com/3.0/lists/021233fcd7";

     let options = {
        method:"POST",
        auth:"midhun1:6255344ba3a676a933d95e26196b0f16-us12"
     };

  let request = https.request(url,options,function(response){
         
        if(response.statusCode === 200){
             res.sendFile(__dirname + "/success.html")
        }else{
             res.sendFile(__dirname + "/failure.html")
        }


        response.on('data',function(data){
             console.log(JSON.parse(data));
        })

     })
 
     
request.write(jsonData);
request.end();
     
})









app.listen(3000,function(){
     console.log("Server is Running at PORT 3000...");
})




//Audience ID (or) ListID
//021233fcd7

//ApiKey
//6255344ba3a676a933d95e26196b0f16-us12

//Mailchimp URl
//https://<dc>.api.mailchimp.com/3.0/