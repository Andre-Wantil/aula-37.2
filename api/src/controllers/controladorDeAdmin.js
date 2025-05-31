const servicoDeAdmin = require("../services/servicoDeAdmin");
const servicoDeUsuario = require("../services/servicoDeUsuario");
const { HttpError } = require("../errors/HttpError");

class ControladorDeAdmin {
    deletar(req, res) {
        if (
            req.headers["x-auth-level"] ===
            "wZl9wYlYusNEPYe5SOBaTmIhbM20qNVaJ85XZZ9Q16s"
        ) {
            const usuarios = servicoDeUsuario.buscarTodos();
            const id = req.params.id;
            const usuárioPorID = usuarios.find((usuario) => usuario.id === id);

            if (usuarios.length === 0 || !usuárioPorID) {
                return res
                    .status(404)
                    .json({ message: "Nenhum usuário foi encontrado." });
            }

            servicoDeAdmin.deletarUmUsuario(id);
            res.status(204).json();
        }
    }

    atualizarPeloID(req, res) {
        if (
            req.headers["x-auth-level"] ===
            "wZl9wYlYusNEPYe5SOBaTmIhbM20qNVaJ85XZZ9Q16s"
        ) {
            const { nome, email, cpf } = req.body;
            const usuarios = servicoDeUsuario.buscarTodos();
            const id = req.params.id;
            const usuárioPorID = usuarios.find((usuario) => usuario.id === id);

            if (usuarios.length === 0 || !usuárioPorID) {
                return res
                    .status(404)
                    .json({ message: "Nenhum usuário foi encontrado." });
            }

            if (!nome && !email && !cpf) {
                return res.status(400).json({ message: "Dados inexistentes" });
            }

            const dados = { nome, email, cpf };

            for (const chave in dados) {
                if (dados[chave]) {
                    usuárioPorID[chave] = dados[chave];
                }
            }

            servicoDeUsuario.cadastrar(usuárioPorID);
            res.status(200).json({ message: "Usuário atualizado" });
        }
    }

    cadastrarProfessor(req, res) {
        if (
            req.headers["x-auth-level"] ===
            "wZl9wYlYusNEPYe5SOBaTmIhbM20qNVaJ85XZZ9Q16s"
        ) {
            const { nome, email, cpf, senha, disciplinas } = req.body;
            const resposta = servicoDeAdmin.cadastrarProfessor(
                nome,
                email,
                cpf,
                senha,
                disciplinas
            );

            if (resposta instanceof Error) {
                return res.status(400).json(resposta.message);
            }

            res.status(201).json(resposta);
        } else {
            res.status(401).json({
                mensagem:
                    "Você não tem autorização para executar essa requisição",
            });
        }
    }
}

module.exports = new ControladorDeAdmin();
