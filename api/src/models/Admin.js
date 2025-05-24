const repositorioDeUsuario = require("../repositories/repositorioDeUsuario");
const { Professor } = require("./Professor");
const { Usuario } = require("./Usuario")

class Admin extends Usuario {
    constructor(nome, email, cpf, senhaHash) {
        super(nome, email, cpf, senhaHash);
        this.role = "admin";
    }

    static criarProfessor(nome, email, cpf, senhaHash, disciplinas) {
        const professor = new Professor(
            nome,
            email,
            cpf,
            senhaHash,
            disciplinas
        );
        return repositorioDeUsuario.criar(professor);
    }
}

module.exports = { Admin };