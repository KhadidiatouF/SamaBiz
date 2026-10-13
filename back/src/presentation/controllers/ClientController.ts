import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../application/use-cases/clients/CreateClientUseCase.js';
import { DeleteClientUseCase } from '../../application/use-cases/clients/DeleteClientUseCase.js';
import { GetClientUseCase } from '../../application/use-cases/clients/GetClientUseCase.js';
import { ListClientsUseCase } from '../../application/use-cases/clients/ListClientsUseCase.js';
import { UpdateClientUseCase } from '../../application/use-cases/clients/UpdateClientUseCase.js';
import { AuthenticationError, NotFoundError } from '../../domain/errors/AppError.js';

const companyIdFrom = (req: Request): string => {
  if (!req.auth?.companyId) throw new AuthenticationError();
  return req.auth.companyId;
};

const idFrom = (req: Request): string => {
  const id = req.params.id;
  if (typeof id !== 'string') throw new NotFoundError('Identifiant invalide');
  return id;
};

export class ClientController {
  constructor(
    private readonly createClient: CreateClientUseCase,
    private readonly listClients: ListClientsUseCase,
    private readonly getClient: GetClientUseCase,
    private readonly updateClient: UpdateClientUseCase,
    private readonly deleteClient: DeleteClientUseCase,
  ) {}

  index = async (req: Request, res: Response) => {
    const result = await this.listClients.execute(companyIdFrom(req), req.query);
    res.json(result);
  };

  store = async (req: Request, res: Response) => {
    const client = await this.createClient.execute(companyIdFrom(req), req.body);
    res.status(201).json(client);
  };

  show = async (req: Request, res: Response) => {
    const client = await this.getClient.execute(companyIdFrom(req), idFrom(req));
    res.json(client);
  };

  update = async (req: Request, res: Response) => {
    const client = await this.updateClient.execute(companyIdFrom(req), idFrom(req), req.body);
    res.json(client);
  };

  destroy = async (req: Request, res: Response) => {
    await this.deleteClient.execute(companyIdFrom(req), idFrom(req));
    res.status(204).send();
  };
}
