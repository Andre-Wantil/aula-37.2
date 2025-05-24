const z = require("zod");
const RepositorioDeAdmin = require("../repositories/repositorioDeAdmin");
const { Admin } = require("../models/Admin");
const { Usuario } = require("../models/Usuario");
const { HttpError } = require("../errors/HttpError");
const { Professor } = require("../models/Professor");

class ServicoDeAdmin {
    deletarUmUsuario(id) {
        return RepositorioDeAdmin.deletarUmUsuario(id);
    }

    cadastrarProfessor(nome, email, cpf, senha, disciplinas) {
        const userSchema = z.object({
            nome: z
                .string({ required_error: "O nome é obrigatório." })
                .trim()
                .min(3, {
                    message: "O nome deve conter pelo menos três caracteres.",
                }),
            email: z
                .string({ required_error: "O email é obrigatório." })
                .email({ message: "O email deve ser um email válido." }),
            cpf: z
                .string({ required_error: "O CPF é obrigatório." })
                .trim()
                .min(11, { message: "O CPF deve conter 11 caracteres." }),
            senha: z
                .string({ required_error: "A senha é obrigatória." })
                .trim()
                .min(8, {
                    message: "A senha deve conter pelo menos 8 caracteres.",
                }),
            disciplinas: z
                .string({ required_error: "Adicione uma disciplina" })
                .trim()
                .min(3, {
                    message: "A disciplina deve conter pelo menos três caracteres."
                })
        });

        const validacao = userSchema.safeParse({ nome, email, cpf, senha, disciplinas });

        if (validacao.success === false) {
            return validacao.error.format();
        }

        return RepositorioDeAdmin.criarProfessor(validacao.data);
    }
}

module.exports = new ServicoDeAdmin();