
import AppError from "@shared/errors/AppError";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { injectable, inject } from "tsyringe";

// o serviço tem uma única responsabilidade de apenas criar o usuário de cliente
// a regra de aplicação é não permitir cadastrar o mesmo email

@injectable()// esta dizendo que essa classe é injetavel
class CreateCustomerService { // reponsável por criar conta de usuários dos clientes
  constructor (
    @inject('CustomersRepository')// o que está sendo injetado
    private customersRepository: ICustomersRepository
    ) {

  }
    public async execute({name, email}: ICreateCustomer): Promise<ICustomer> {

      const emailExists = await this.customersRepository.findByEmail(email);// pega email do repositorio customizado

      if(emailExists) {
        throw new AppError('Esse endereço de email ja está em uso.'); // aqui verifica se o email ja existe
      }


      const customer = await this.customersRepository.create({ // aqui prepara o objeto para ser enviado para o db e salva
          name,
          email,
      });


      return customer;
    }
}

export default CreateCustomerService;
