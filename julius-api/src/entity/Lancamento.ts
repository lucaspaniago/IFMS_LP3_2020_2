import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioController } from "../Controller/UsuarioController";
import { Usuario } from "./Usuario";

@Entity()
export class Lancamento {

    constructor(valor: number, descricao: string, data: Date, usuario: Usuario) {
        this.valor = valor;
        this.descricao = descricao;
        this.data = data;
        this.usuario = usuario;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'float'})
    valor: number;

    @Column()
    descricao: string;

    @Column()
    data: Date;

    @ManyToOne(() => Usuario)
    usuario: Usuario;
    
}