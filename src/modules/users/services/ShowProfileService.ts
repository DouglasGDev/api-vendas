import { getCustomRepository } from "typeorm";
import  UsersRepository  from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
// o serviço tem uma única responsabilidade de apenas listar o usuario

interface IRequest {
  user_id: string;
}

class ShowProfileService {
    public async execute({user_id}:IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);


        const user = await usersRepository.findById(user_id);// aqui ele vai receber o id fazer a busca do usuario no db

        if(!user){
          throw new AppError('Usuário não encontrado.');// excessão
        }

        return user; // e aqui ele retorna o usuário
    }
}

export default ShowProfileService;
