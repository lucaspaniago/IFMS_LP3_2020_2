import { Router } from 'express';
import { UsuarioController } from '../Controller/UsuarioController';
import { Usuario } from '../entity/Usuario';

export const routerUsuario = Router();

const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo usuário
 */
routerUsuario.post('/', async (req, res) => {
    const {nome, email} = req.body;
    const usuario = new Usuario(nome, email);
    const usuarioSalvo = await usuarioCtrl.salvar(usuario);
    res.json(usuarioSalvo);
});

/**
 * Serviço para recuperar todos os usuários
 */
routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioCtrl.recuperarTodos();
    res.json(usuarios);
});

/**
 * Serviço para recuperar todos os lançamentos de um determinado usuário
 */
routerUsuario.get('/lancamentos/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosDoUsuario(idUsuario);
    res.json(lancamentos);
});

/**
 * Recupera um usuário pelo id
 */
routerUsuario.get("/:id", async (req,res) => {
    const id  = parseInt(req.params.id);
    const usuario = await usuarioCtrl.recuperarPorId(id);
    res.json(usuario);
});

/**
 * Serviço para recuperar os lançamentos positivos
 */
routerUsuario.get("/lancamentos/entradas/:id", async (req, res) => {
    const id  = parseInt(req.params.id);
    const lancamentos =  await usuarioCtrl.recuperarValorPositivo(id);

    if(lancamentos){
        res.json(lancamentos);
    }else{
        res.status(404).json({mensagem: "Não foram encontrados lançamentos positivos"})
    }
   

});

/**
 * Serviço para recuperar os lançamentos negativos
 */
routerUsuario.get("/lancamentos/gastos/:id", async (req, res) => {
    const id  = parseInt(req.params.id);
    const lancamentos =  await usuarioCtrl.recuperarValorNegativo(id);

    if(lancamentos) {
        res.json(lancamentos);
    } else {
        res.status(404).json({mensagem: "Não foram encontrados lançamentos negativos"})
    }
});