import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import AppError from "@shared/errors/AppError";


// o serviço tem uma única responsabilidade de apenas enviar a recuperação de senha por e-mail do usuário
interface IRequest {
   email: string;
}
class SendForgotPasswordEmailService { // reponsável por enviar o email de recuperação de senha
    public async execute({ email }: IRequest): Promise<void> {
      const usersRepository = getCustomRepository(UsersRepository);// aqui pega o repositorio customizado, onde fica os métodos
      const userTokensRepository = getCustomRepository(UserTokensRepository);// repositorio de token dos usuários

      const user = await usersRepository.findByEmail(email);

      if(!user){
        throw new AppError('Usuário não encontrado.'); // aqui verifica se o email disponibilizado foi encontrado e se não foi da esse erro.
      }

      const {token} = await userTokensRepository.generate(user.id);// aqui passa o id de usuário para se gerar o token

      //console.log(token);

      await EtherealMail.sendMail({
        to: {
          name: user.name,
          email: user.email,

        },
        subject: '[Api Vendas] Recuperação de senha',
        templateData: {
          template: `Olá {{name}}: {{token}}`,
          variables: {
            name: user.name,
            token,

          }
        }, // aqui está mandando o token pro fake email
      })
    }
}

export default SendForgotPasswordEmailService;
