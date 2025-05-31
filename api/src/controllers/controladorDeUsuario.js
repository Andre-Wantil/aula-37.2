const servicoDeUsuario = require("../services/servicoDeUsuario");
const { HttpError } = require("../errors/HttpError");

class ControladorDeUsuario {
    pegarTodos(_req, res) {
        const usuarios = servicoDeUsuario.buscarTodos();

        if (usuarios.length === 0) {
            return res
                .status(404)
                .json({ message: "Nenhum usuário foi encontrado." });
        }

        res.status(200).json(usuarios);
    }

    pegarUmPeloID(req, res) {
        //Coleta os dados necessários
        const usuarios = servicoDeUsuario.buscarTodos();
        const id = req.params.id;
        const usuárioPorID = servicoDeUsuario.buscarPeloID(id);
        //Checagem de dados vazios ou incorretos
        if (usuarios.length === 0 || !usuárioPorID) {
            return res
                .status(404)
                .json({ message: "Nenhum usuário foi encontrado." });
        }

        res.status(200).json(usuárioPorID);
    }

    cadastrar(req, res) {
        const { nome, email, cpf, senha } = req.body;
        const resposta = servicoDeUsuario.cadastrar(nome, email, cpf, senha);

        res.status(201).json(resposta);
    }

    conectar(req, res) {
        const { email, senha } = req.body;
        const resposta = servicoDeUsuario.conectar(email, senha);

        if (resposta instanceof HttpError) {
            return res.status(resposta.status).json({ erro: resposta.message });
        }

        res.status(200).json(resposta);
    }
}

module.exports = new ControladorDeUsuario();
