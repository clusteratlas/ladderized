const express = require('express');

const app = express();

app.get('/', function (req, res) {
	res.redirect('/demo');
})

app.listen(80, function () {
	console.log('Ladderized demo running on localhost port 80!')
});

app.use(express.static('../'));