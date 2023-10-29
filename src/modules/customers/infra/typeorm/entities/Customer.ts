import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";

@Entity('customers')  // a entide comunica direto com a tabela users do db
class Customer implements ICustomer { // para implementar o model customer, ficar padrão, é para prevenir mudanças serem feitas aqui e depois não sabermos onde está o erro
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
