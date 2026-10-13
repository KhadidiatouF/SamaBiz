import { AuthSession } from '../../../domain/entities/AuthSession.js';
import { ConflictError } from '../../../domain/errors/AppError.js';
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { RegisterDTO } from '../../dto/AuthDTO.js';
import { IPasswordHasher } from '../../services/IPasswordHasher.js';
import { ITokenService } from '../../services/ITokenService.js';

export class RegisterUserUseCase {
  constructor(
    private readonly users: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: RegisterDTO): Promise<AuthSession> {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictError('Cet email est deja utilise');
    }

    const passwordHash = await this.passwordHasher.hash(dto.password);
    const user = await this.users.createOwnerWithCompany({
      companyName: dto.companyName,
      name: dto.name,
      email: dto.email.toLowerCase(),
      passwordHash,
    });

    const payload = { userId: user.id, companyId: user.companyId, role: user.role };
    const accessToken = this.tokenService.signAccessToken(payload);
    const refreshToken = this.tokenService.signRefreshToken(payload);
    await this.users.updateRefreshTokenHash(user.id, await this.passwordHasher.hash(refreshToken));

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        companyId: user.companyId,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    };
  }
}
