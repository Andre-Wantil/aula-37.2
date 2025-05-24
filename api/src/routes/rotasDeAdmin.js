const express = require("express");
const controladorDeAdmin = require("../controllers/controladorDeAdmin");
const rotasDeAdmin = express.Router();

rotasDeAdmin.post("/admin/cadastrar", controladorDeAdmin.cadastrarProfessor);
rotasDeAdmin.put("/admin/:id", controladorDeAdmin.atualizarPeloID);
rotasDeAdmin.delete("/admin/:id", controladorDeAdmin.deletar);

module.exports = rotasDeAdmin;
