import { getManager, LessThan, MoreThanOrEqual } from "typeorm";
import { Lancamento } from "../entity/Lancamento";
import { Usuario } from "../entity/Usuario";

export class UsuarioController {

    async salvar (usuario: Usuario) {
        const usuarioSalvo = await getManager().save(usuario);
        return usuarioSalvo;
    }

    async recuperarTodos() {
        const usuarios = await getManager().find(Usuario);
        return usuarios;
    }

    async recuperarPorId(id: number) {
        const usuario = await getManager().findOne(Usuario, id);
        return usuario;
    }

    async recuperarLancamentosDoUsuario(id: number) {
        const usuario = await getManager().findOne(Usuario, id, {
            relations: ['lancamentos']
        });
        return usuario.lancamentos;
    }

    async recuperarValorPositivo(id: number){

        const lancamentoPositivo = await getManager().find( Lancamento, {
            where: {
                usuario: id,
                valor: MoreThanOrEqual(0),
            }
            
        });
        return lancamentoPositivo;
    }


    async recuperarValorNegativo(id: number){

        const lancamentoNegativo = await getManager().find( Lancamento, {
            where: {
                usuario: id,
                valor: LessThan(0),
            }      
        });
        return lancamentoNegativo;
    }
}