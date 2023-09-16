import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
// o serviço tem uma única responsabilidade de apenas criar a ordem, o pedido
// a regra de aplicação é não permitir cadastrar o produto com mesmo nome

interface IProduct {
  id: string;
  quantity: number;
}
interface IRequest {
   customer_id: string;
   products: IProduct[];
}

class CreateOrderService {
    public async execute({customer_id, products}: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductRepository);


        const customerExists = await customersRepository.findById(customer_id);

        if(!customerExists) {
          throw new AppError('Não foi encontrado nenhum cliente com o id informado.'); // aqui verifica se não tem cliente  cadastrado
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if(!existsProducts.length) {
          throw new AppError('Não foi encontrado nenhum produto com os ids informados.'); // aqui verifica se tem produto com o id informado, no caso verifica se não tem para disparar a mensgem de erro
        }

        const existsProductsIds = existsProducts.map((product) => product.id);// aqui mapeia os ids que foram passados dos produtos

        const checkInexistentProducts = products.filter(
          product => !existsProductsIds.includes(product.id),// aqui pega os produtos que não foram inclusos nos ids(dos que não foram encontrados) e adiciona na variavel
        );

        if(checkInexistentProducts.length) {
          throw new AppError(`Não foi encontrado produto ${checkInexistentProducts[0].id}.`); // aqui verifica o id informado que não foi encontrado nos produtos.
        }

        const quantityAvailable = products.filter(
          product => existsProducts.filter(// to pegando cada produto que foi enviado e relacionando com o array dos produtos encontrado, confirmados e verifica a quantidade disponivel do produto
            p => p.id === product.id
          )[0].quantity < product.quantity// aqui garante que não pode vender mais do que tem disponivel em estoque
        );

        if(quantityAvailable.length) {
          throw new AppError(`A quantidade  ${quantityAvailable[0].quantity} não está disponível para ${quantityAvailable[0].id}.`); // aqui solta o erro de quantidade indisponivel para tal produto.
        }

    }
}

export default CreateOrderService;
