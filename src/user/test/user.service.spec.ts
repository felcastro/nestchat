import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
  let userService: UserService;

  beforeEach(async () => {
    userService = new UserService(null);

    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UserService, useValue: userService }],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
