import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SendMailForgotPasswordService from '@users/tokens/services/SendMailForgotPasswordService';
import ResetPasswordService from '@users/tokens/services/ResetPasswordService';

class TokensController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendMailForgotPasswordService = container.resolve(SendMailForgotPasswordService);

    await sendMailForgotPasswordService.execute({ email });

    return response.status(204).json();
  }

  public async reset(request: Request, response: Response): Promise<Response> {
    const { token, password, confirm_password } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({ token, password, confirm_password });

    return response.status(204).json();
  }
}

export default new TokensController;
