const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const server = http.createServer(app);
const port = 3000;
const dashboard = require('./server/routes/api/dashboard');
const jsonfile = require('jsonfile');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

let data = require('./data.json');
let script = require('./views/script.js');
app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Вы сломали сервер!");
});

app.use((err, req, res, next) => {
	if (error instanceof ForbiddenError) {
		return res.status(403).send({
			status: "forbidden",
			message: error.message,
		});
	}
});

app.put('/edit/:id', function(req, res) {
    var id = req.params.id;
    var newText = req.body.text;
    jsonfile.readFile('data.json', function(err, obj) {
      var fileObj = obj;
      fileObj[id].text = newText;
      jsonfile.writeFile('data.json', fileObj, function(err) {
          if (err) throw err;
      });
    });
	res.json('ok')
});
app.set('view engine', 'pug')

app.use(express.static("views"));


app.use('/dashboard', function (request, response) {
	response.render('index',{data}),
	response.render('index',{script})})


	app.use('/registr', function (request, response) {
response.render('registr',)
})
// Routes
// app.use("/registr", regi);


app.use(express.static("client/build"));
// самому поменять

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./", "client", "build", "index.html"));
	// самому поменять
});

//Go the SERVERs
server.listen(port, () => {
	console.log("\x1b[35m%s\x1b[0m", `The server is running on the port ${port}`);
	console.log("\x1b[32m%s\x1b[0m", `http://localhost:${port}/`);
	// console.log(`Worker ${cluster.worker.id} launched`);
});