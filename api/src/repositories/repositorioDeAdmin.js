const { Admin } = require("../models/Admin");
const RepositorioDeUsuario = require("./repositorioDeUsuario")

class RepositorioDeAdmin {
    deletarUmUsuario(id) {
        return Admin.deletarUmUsuario(id);
    }

    criarProfessor(usuario) {
        const {nome, email, cpf, senha, disciplinas} = usuario
        return Admin.criarProfessor(nome, email, cpf, senha, disciplinas)
    }
}

module.exports = new RepositorioDeAdmin();