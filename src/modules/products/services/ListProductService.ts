import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
// o serviço tem uma única responsabilidade de apenas listar o produto

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();


        const products = productsRepository.find();// aqui ele vai receber o nome fazer a busca do produto no db

        await redisCache.save('key', 'value');

        return products; // e aqui ele retorna os produtos
    }
}

export default ListProductService;
