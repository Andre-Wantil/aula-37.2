const { Professor } = require("../models/Professor");

class RepositorioDeProfessor {
    novaAula(disciplina) {
        Professor.novaAula(disciplina);
    }
}