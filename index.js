const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

const MONGO_URL = 'mongodb://jiyunius:Jiyun135!@ds249355.mlab.com:49355/practice'; // !!! my password is revealed !!!
// connect to mongodb
mongoose.connect(MONGO_URL);
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// middlewares
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));


// error handling middleware // routes에서 에러 next로 넘어온거 여기서 처리
app.use(function(err, req, res, next){
    // console.log(err);
    res.status(422).send({error: err.message});
    // status도 200 -> 422로 변경
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});










/*
app.get("/", function(req, res){
    console.log('GET request');
    res.send({name: "jiyun", phone: "010-2974-1984"});
});
*/
