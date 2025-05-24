const servicoDeAdmin = require("../services/servicoDeAdmin");
const servicoDeUsuario = require("../services/servicoDeUsuario");
const { HttpError } = require("../errors/HttpError");

class ControladorDeAdmin {
    deletar(req, res) {
        try {
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
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ erro: error.message });
            }

            res.status(500).json({ erro: error.message });
        }
    }

    atualizarPeloID(req, res) {
        try {
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
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ erro: error.message });
            }

            res.status(500).json({ erro: error.message });
        }
    }

    cadastrarProfessor(req, res) {
            try {
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
            } catch (error) {
                res.status(500).json({
                    erro: error.message || "Erro ao buscar usuários.",
                });
            }
        }
}

module.exports = new ControladorDeAdmin();
