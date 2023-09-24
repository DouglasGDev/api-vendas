import Redis, {Redis as RedisClient} from 'ioredis';
import cacheConfig from '@config/cache';

// isso é para configurar o Redis e colocar ele em funcionamento

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any) : Promise<void> { // salvar cache
    await this.client.set(key, JSON.stringify(value));// pode ser passado um objeto(que contém array, qualquer coisa, pq não sabemos exatamente o dado), mas vai ser convertido no proprio json para string, para não pessar no redis

  }

  //public async recover<T>(key: string): Promise<T | null> {// get, pesquisa
   // console.log(key);
  //}

  // public async invalidate(key: string) : Promise<void> { // delete, vai servir para deletar cache para não ficar armazenando informação e lotar

  // }
}
