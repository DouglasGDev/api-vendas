import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
// o serviço tem uma única responsabilidade de apenas listar o produto

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);


        const products = productsRepository.find();// aqui ele vai receber o nome fazer a busca do produto no db

        return products; // e aqui ele retorna os produtos
    }
}

export default ListProductService;
