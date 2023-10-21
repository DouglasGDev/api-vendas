import { getCustomRepository } from "typeorm";
import  UsersRepository  from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";

// o serviço tem uma única responsabilidade de apenas criar o usuário
// a regra de aplicação é não permitir cadastrar o mesmo email
interface IRequest {
   user_id: string;
   avatarFilename: string;
}
class UpdateUserAvatarService { // reponsável por criar conta de usuários
    public async execute({user_id, avatarFilename }: IRequest): Promise<User> {
      const usersRepository = getCustomRepository(UsersRepository);// aqui pega o repositorio customizado, onde fica os métodos

      const storageProvider = new DiskStorageProvider();

      const user = await usersRepository.findById(user_id);// está fazendo a procura pelo id de usuário

      if(!user){
        throw new AppError('Usuário não encontrado.');
      }



      if(user.avatar) {
        await storageProvider.deleteFile(user.avatar);// se existe foto de avatar, vai deletar para poder substituir a foto atual
      }

      const filename = await storageProvider.saveFile(avatarFilename); // salva o arquivo com o nome do avatar que recebe por aparametro

      user.avatar = filename; // aqui passa o arquivo com o nome do avatar na variável de filename

      await usersRepository.save(user);

      return user;
    }
}

export default UpdateUserAvatarService;
