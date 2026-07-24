const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: "Erro no servidor" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(404).send({
          message: "Id inválido",
        });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(400).send({
          message: "Usuário não encontrado",
        });
      }
      res.status(500).send({ message: "Erro no servidor" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Dados inválidos",
        });
      }
      res.status(500).send({ message: "Erro no servidor" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => {
      return res.send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: "Erro no servidor" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  ).orFail().then((card) => {
    return res.send(card);
  }).catch((err) => {
    res.status(500).send({ message: "Erro no servidor" });
  });
};
