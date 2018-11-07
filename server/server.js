const port = 3000;

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')


const routes = require("./routes/index");
const app = express();


const server = require("http").Server(app);

mongoose.connect("mongodb://gabrielcabralbfr:smvg1234@ds031108.mlab.com:31108/mean-task-db",
  { useNewUrlParser: true }
);

// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });
app.use(cors())
app.use(express.json());
app.use("/api", routes);

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});