import { LoginUserUseCase } from '../../application/use-cases/auth/LoginUserUseCase.js';
import { RegisterUserUseCase } from '../../application/use-cases/auth/RegisterUserUseCase.js';
import { CreateClientUseCase } from '../../application/use-cases/clients/CreateClientUseCase.js';
import { DeleteClientUseCase } from '../../application/use-cases/clients/DeleteClientUseCase.js';
import { GetClientUseCase } from '../../application/use-cases/clients/GetClientUseCase.js';
import { ListClientsUseCase } from '../../application/use-cases/clients/ListClientsUseCase.js';
import { UpdateClientUseCase } from '../../application/use-cases/clients/UpdateClientUseCase.js';
import { GetDashboardSummaryUseCase } from '../../application/use-cases/dashboard/GetDashboardSummaryUseCase.js';
import { AuthController } from '../../presentation/controllers/AuthController.js';
import { ClientController } from '../../presentation/controllers/ClientController.js';
import { DashboardController } from '../../presentation/controllers/DashboardController.js';
import { prisma } from '../database/prisma.js';
import { PrismaClientRepository } from '../repositories/PrismaClientRepository.js';
import { PrismaDashboardRepository } from '../repositories/PrismaDashboardRepository.js';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository.js';
import { BcryptPasswordHasher } from '../services/BcryptPasswordHasher.js';
import { JwtTokenService } from '../services/JwtTokenService.js';

const userRepository = new PrismaUserRepository(prisma);
const clientRepository = new PrismaClientRepository(prisma);
const dashboardRepository = new PrismaDashboardRepository(prisma);
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();

export const container = {
  tokenService,
  authController: new AuthController(
    new RegisterUserUseCase(userRepository, passwordHasher, tokenService),
    new LoginUserUseCase(userRepository, passwordHasher, tokenService),
  ),
  clientController: new ClientController(
    new CreateClientUseCase(clientRepository),
    new ListClientsUseCase(clientRepository),
    new GetClientUseCase(clientRepository),
    new UpdateClientUseCase(clientRepository),
    new DeleteClientUseCase(clientRepository),
  ),
  dashboardController: new DashboardController(new GetDashboardSummaryUseCase(dashboardRepository)),
};
