const port = 3000;

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')


const routes = require("./routes/index");
const app = express();


const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect("mongodb://gabrielcabralbfr:smvg1234@ds155203.mlab.com:55203/goweekdb-gb",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(cors())
app.use(express.json());
app.use("/", routes);

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});