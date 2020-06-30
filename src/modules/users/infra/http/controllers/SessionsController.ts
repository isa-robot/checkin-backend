import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AutenticateUserService';

class SessionsController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { username, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({ username, password });

        delete user.password;

        return response.status(200).json({ user, token });
    }
}

export default new SessionsController;
