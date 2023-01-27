 const express=require('express')
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose')
 mongoose.set('strictQuery', false)
 const route=require("./route/route")
 const app= express()

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true }));


 mongoose.connect("mongodb+srv://nisitsolanki:9978793231@cluster0.te1decq.mongodb.net/streamSpace", {useNewUrlParser:true})
 .then(()=> console.log("MongoDb is connected"))
 .catch(err => console.log(err))

 app.use('/api/docs/static/',route)

 app.listen(process.env.PORT || 9000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 9000))
});