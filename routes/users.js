const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  const usersPath = path.join(__dirname, "../data/users.json");

  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Erro em ler o arquivo" });
    }

    res.send(JSON.parse(data));
  });
});

router.get("/:userId", (req, res) => {
  const usersPath = path.join(__dirname, "../data/users.json");

  fs.readFile(usersPath, "utf8", (err, data) => {
   if(err) {
    return res.status(500).send({ message: "Erro em ler o arquivo"})
   }

const users = JSON.parse(data);

const user = users.find((user) => user._id === req.params.userId)

if(!user) {
 return res.status(404).send({ message: "Usuário não encontrado"})
}

res.send(user)
  })

});

module.exports = router;