const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(8080);
console.log('running..');

app.get('/', function(req, res){
    res.send("working");
})