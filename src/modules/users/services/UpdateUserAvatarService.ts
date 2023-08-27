import { getCustomRepository } from "typeorm";
import  UsersRepository  from "../typeorm/repositories/UsersRepository";
import uploadConfig from '@config/upload';
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import path from "path";
import fs from 'fs';


// o serviço tem uma única responsabilidade de apenas criar o usuário
// a regra de aplicação é não permitir cadastrar o mesmo email
interface IRequest {
   user_id: string;
   avatarFilename: string;
}
class UpdateUserAvatarService { // reponsável por criar conta de usuários
    public async execute({user_id, avatarFilename }: IRequest): Promise<User> {
      const usersRepository = getCustomRepository(UsersRepository);// aqui pega o repositorio customizado, onde fica os métodos

      const user = await usersRepository.findById(user_id);// está fazendo a procura pelo id de usuário

      if(!user){
        throw new AppError('Usuário não encontrado.');
      }

      if(user.avatar) {
        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // aqui pega o arquivo de avatar do usuário e seleciona caso exista
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);// aqui verifica o status se realmente existe o arquivo no diretorio

        if(userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);// se exixtir ele vai remover os arquivos do sistema de arquivos
        }
      }
      user.avatar = avatarFilename; // aqui passa o arquivo com o nome do avatar na variável de filename

      await usersRepository.save(user);

      return user;
    }
}

export default UpdateUserAvatarService;
