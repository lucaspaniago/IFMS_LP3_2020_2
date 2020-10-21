import { Router } from "express";
import { LancamentoController } from "../Controller/LancamentoController";
import { UsuarioController } from "../Controller/UsuarioController";
import { Lancamento } from "../entity/Lancamento";

export const routerLancamento = Router();
const lancamentoCtrl = new LancamentoController();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo lançamento
 */
routerLancamento.post('/', async(req, res) => {
    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);

    if(usuario) {
        const lancamento = new Lancamento(valor, descricao, data, usuario);
        const lancamentoSalvo = await lancamentoCtrl.salvar(lancamento);
        res.json(lancamentoSalvo);
    } else {
        res.status(404).json({ mensagem: 'Usuário do lancamento não encontrado' })
    }
});


/**
 * Alterar um lancamento
 */

routerLancamento.put("/:id", async (req,res) => {

    const id = parseInt(req.params.id);

    const { idUsuario,valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    const lancamento = new Lancamento(valor, descricao, data, usuario);
    
    const lancamentoAlterado = await lancamentoCtrl.atualizar(id, lancamento.valor, lancamento.descricao, lancamento.data);

    if(lancamentoAlterado) {
        res.status(200).json({ mensagem: "Lançamento alterado com sucesso"});
    } else {
        res.status(404).json({mensagem: "Lançamento não encontrado"});
    }
});


/**
 * Deletar um lançamento
 */

routerLancamento.delete("/:id", async (req,res) =>{
    const id  = parseInt(req.params.id);

    if(await lancamentoCtrl.delete(id)){
    
        res.status(200).json({ mensagem: "Lançamento excluido com sucesso"});
    }else{
        res.status(404).json({ mensagem: "Nenhum lancamento encontrado"});
    }

});