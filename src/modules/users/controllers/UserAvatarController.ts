import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
// controlador exclusivo para atualizar foto de avatar.
export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,// aqui esta dizendo que recebe string, o nome da foto de avatar
    });
    return response.json(user);
  }
}
