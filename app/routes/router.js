var express = require("express");
var router = express.Router();
const { tarefasModel } = require("../models/tarefasModel");
const moment = require("moment");
moment.locale("pt-br");

// ── GET / — lista todas as tarefas ativas ──────────────────────────────────
router.get("/", async (req, res) => {
    res.locals.moment = moment;
    try {
        const listaTarefas = await tarefasModel.findAll();
        res.render("pages/index", { listaTarefas, erro: null });
    } catch (erro) {
        console.error("findAll:", erro.message);
        res.render("pages/index", { listaTarefas: [], erro: "Não foi possível carregar as tarefas." });
    }
});

// ── GET /cadastro — exibe o formulário ────────────────────────────────────
router.get("/cadastro", (req, res) => {
    res.render("pages/cadastro", { erro: null, sucesso: null });
});

// ── POST /nova-tarefa — salva nova tarefa ─────────────────────────────────
router.post("/nova-tarefa", async (req, res) => {
    try {
        await tarefasModel.create({ nome: req.body.nome, prazo: req.body.prazo });
        res.redirect("/");
    } catch (erro) {
        console.error("create:", erro.message);
        res.render("pages/cadastro", { erro: erro.message, sucesso: null });
    }
});

// ── GET /excluir-logico/:id — soft delete, redireciona para home ──────────
router.get("/excluir-logico/:id", async (req, res) => {
    try {
        const result = await tarefasModel.softDeleteById(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).send("Tarefa não encontrada.");
        }
        res.redirect("/");
    } catch (erro) {
        console.error("softDelete:", erro.message);
        res.status(500).send("Erro ao excluir tarefa.");
    }
});

// ── GET /teste-delete/:id — hard delete (rota de teste) ───────────────────
router.get("/teste-delete/:id", async (req, res) => {
    try {
        const result = await tarefasModel.deleteById(req.params.id);
        res.json(result);
    } catch (erro) {
        console.error("deleteById:", erro.message);
        res.status(500).json({ erro: erro.message });
    }
});

// ── GET /teste-insert — insert de teste ───────────────────────────────────
router.get("/teste-insert", async (req, res) => {
    try {
        const result = await tarefasModel.create({
            nome: "limpar gabinete PC",
            prazo: "2026-03-23"
        });
        res.json(result);
    } catch (erro) {
        console.error("teste-insert:", erro.message);
        res.status(500).json({ erro: erro.message });
    }
});

module.exports = router;
