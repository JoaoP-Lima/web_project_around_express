const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const usersRouter = require("./routes/users");

const cardsRouter = require("./routes/cards");

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: "6a5fe33928b4a3274a60b166",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: "Solicitação não encontrada" });
});
