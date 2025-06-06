const { Usuario } = require("./Usuario");

class Professor extends Usuario {
  constructor(nome, email, cpf, senhaHash, disciplinas) {
    super(nome, email, cpf, senhaHash);
    this.role = "professor";
    this.disciplinas = disciplinas;
  }

  static novaAula(disciplina) {
    this.disciplinas.push(disciplina);
  }

  async buscarAulas() {
    return this.disciplinas;
  }

  async buscarAula(disciplina) {
    return this.disciplinas.find((aula) => aula === disciplina);
  }

  async excluirAula(disciplina) {
    this.disciplinas = this.disciplinas.filter((aula) => aula !== disciplina);
  }

  async atualizarAula(disciplina, novaDisciplina) {
    this.disciplinas[this.disciplinas.indexOf(disciplina)] = novaDisciplina;
  }
}

module.exports = { Professor }