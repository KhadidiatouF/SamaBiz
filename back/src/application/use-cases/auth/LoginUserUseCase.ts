import { AuthSession } from '../../../domain/entities/AuthSession.js';
import { AuthenticationError } from '../../../domain/errors/AppError.js';
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { LoginDTO } from '../../dto/AuthDTO.js';
import { IPasswordHasher } from '../../services/IPasswordHasher.js';
import { ITokenService } from '../../services/ITokenService.js';

export class LoginUserUseCase {
  constructor(
    private readonly users: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: LoginDTO): Promise<AuthSession> {
    const user = await this.users.findByEmail(dto.email.toLowerCase());
    if (!user) {
      throw new AuthenticationError('Identifiants invalides');
    }

    const passwordOk = await this.passwordHasher.compare(dto.password, user.passwordHash);
    if (!passwordOk) {
      throw new AuthenticationError('Identifiants invalides');
    }

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
