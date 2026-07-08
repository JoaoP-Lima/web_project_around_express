const router = require("express").Router();
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
  const cardsPath = path.join(__dirname, "../data/cards.json");

  fs.readFile(cardsPath, "utf8", (err, data) => {
    if(err) {
     return res.status(500).send({ message: "Erro em ler o arquivo"})
    }

    res.send(JSON.parse(data))
  })
})



module.exports = router;