const pool = require("../../config/pool_conexoes");

const tarefasModel = {

    findAll: async () => {
        const [linhas] = await pool.query(
            "SELECT * FROM tarefas WHERE status_tarefa = 1"
        );
        return linhas;
    },

    findById: async (id) => {
        const [linhas] = await pool.query(
            "SELECT * FROM tarefas WHERE status_tarefa = 1 AND id_tarefa = ?",
            [id]
        );
        return linhas;
    },

    create: async (dados) => {
        /*
            formato esperado:
            { nome: "nome da tarefa", prazo: "YYYY-MM-DD" }
        */
        if (!dados.nome || !dados.prazo) {
            throw new Error("Campos nome e prazo são obrigatórios.");
        }
        const [result] = await pool.query(
            "INSERT INTO tarefas (`nome_tarefa`, `prazo_tarefa`) VALUES (?, ?)",
            [dados.nome, dados.prazo]
        );
        return result;
    },

    // DELETE físico: remove permanentemente o registro
    deleteById: async (id) => {
        const [result] = await pool.query(
            "DELETE FROM tarefas WHERE id_tarefa = ?",
            [id]
        );
        return result;
    },

    // DELETE lógico: marca status_tarefa = 0, mantendo o registro no banco
    softDeleteById: async (id) => {
        const [result] = await pool.query(
            "UPDATE tarefas SET status_tarefa = 0 WHERE id_tarefa = ?",
            [id]
        );
        return result;
    },

};

module.exports = { tarefasModel };
