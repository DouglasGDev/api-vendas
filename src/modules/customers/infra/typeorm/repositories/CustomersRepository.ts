import { getRepository, Repository } from 'typeorm'; // tem função exclusiva em filtrar por email, id e nome.
import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';


class CustomersRepository  implements ICustomersRepository {
  private ormRepository: Repository<Customer>;// o repositorio vai manipular a estrutura de dados de clientes
  constructor() {
    this.ormRepository = getRepository(Customer);
  }

public async create({name, email}: ICreateCustomer): Promise<Customer> { // para criar o cliente
    const customer = await this.ormRepository.create({name, email});// aqui recebe nome e email para salvar na variável

    await this.ormRepository.save(customer);// aqui chama o repositorio para salvar o customer

    return customer;// aqui retorna o customer
}

public async save(customer: Customer): Promise<Customer> {
  await this.ormRepository.save(customer);// aqui chama o repositorio para salvar o customer

  return customer;// aqui retorna o customer
}

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export default CustomersRepository;
