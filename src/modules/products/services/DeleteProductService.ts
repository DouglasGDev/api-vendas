import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
// o serviço tem uma única responsabilidade de apenas deletar um produto

interface IRequest {
  id: string;
}

class DeleteProductService {
    public async execute({id}: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);


        const product = await productsRepository.findOne(id);// aqui ele vai receber o id e vai fazer a busca do produto no db

        if(!product) {
          throw new AppError('Não há resultados para a busca.');// se não houver resultado
        }

        await productsRepository.remove(product);// aqui remove o produto do db

    }
}

export default DeleteProductService;
