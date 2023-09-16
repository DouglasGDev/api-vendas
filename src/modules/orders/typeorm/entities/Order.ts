import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "@modules/customers/typeorm/entities/Customer";

@Entity('orders')  // a entide comunica direto com a tabela orders do db
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer) // o tipo de cardialidade que faz com o customer(cliente)
  @JoinColumn({name: 'customer_id'}) // e qual a coluna que faz a ligação da referencia
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
