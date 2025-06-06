const { Usuario } = require("../models/Usuario");

class RepositorioDeUsuario {
    buscarTodos() {
        return Usuario.buscarTodos();
    }

    buscarPeloID(id) {
        return Usuario.buscarPeloID(id);
    }

    criar(usuario) {
        return usuario.salvar();
    }

    buscarPeloEmail(email) {
        return Usuario.buscarPeloEmail(email);
    }

    async compararSenha(senha) {
        return await Usuario.compararSenha(senha);
    }

}

module.exports = new RepositorioDeUsuario();
