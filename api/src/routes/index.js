const express = require("express");
const router = express.Router();

const rotasDeUsuario = require("../routes/rotasDeUsuario");
const rotasDeAdmin = require("../routes/rotasDeAdmin");

router.get("/", (_req, res) => res.status(200).send("Olá mundo"));

router.use("/usuarios", rotasDeUsuario, rotasDeAdmin);

module.exports = router;