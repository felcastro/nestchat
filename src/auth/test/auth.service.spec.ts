import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    userService = new UserService(null);
    authService = new AuthService(userService, null);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: UserService, useValue: userService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
