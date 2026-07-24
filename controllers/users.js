const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: "Erro no servidor" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
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

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Usuário não encontrado",
        });
      }

      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Id inválido",
        });
      }
      res.status(500).send({ message: "Erro no servidor" });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Dados Inválidos",
        });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Usuário não encontrado",
        });
      }

      return res.status(500).send({
        message: "Erro no servidor",
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((avatar) => {
      return res.send(avatar);
    })
    .catch((err) => {
      if (err === "ValidationError") {
        return res.status(400).send({
          message: "Dados inválidos",
        });
      }
      if (err === "DocumentNotFoundError") {
        message: "Usuário não encontrado";
      }

      return res.status(500).send({
        messsage: "Erro no servidor",
      });
    });
};
