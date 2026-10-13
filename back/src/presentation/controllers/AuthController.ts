import { Request, Response } from 'express';
import { LoginUserUseCase } from '../../application/use-cases/auth/LoginUserUseCase.js';
import { RegisterUserUseCase } from '../../application/use-cases/auth/RegisterUserUseCase.js';

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
  ) {}

  register = async (req: Request, res: Response) => {
    const session = await this.registerUser.execute(req.body);
    res.status(201).json(session);
  };

  login = async (req: Request, res: Response) => {
    const session = await this.loginUser.execute(req.body);
    res.json(session);
  };

  logout = async (_req: Request, res: Response) => {
    res.status(204).send();
  };

  forgotPassword = async (_req: Request, res: Response) => {
    res.status(202).json({ message: 'Si le compte existe, un email de reinitialisation sera envoye.' });
  };

  resetPassword = async (_req: Request, res: Response) => {
    res.status(202).json({ message: 'Flux de reinitialisation pret a connecter au service email.' });
  };
}
