import {container} from 'tsyringe';// para fazer injeção de dependencia
import {ICustomersRepository} from '@modules/customers/domain/repositories/ICustomersRepository';// atipagem que tem a se seguir
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';// a dependencia a ser injetada, isso é a implemetação, implements

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);// essa chave ela é utilizada para cada siclo de vida do projeto, ela fica aramzenada como se fosse um token, esta registrado no container
