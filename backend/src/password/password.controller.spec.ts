import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

describe('PasswordController', () => {
  let passwordController: PasswordController;
  let passwordService: PasswordService;

  const id = 1;
  const password = 'password';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordController],
      providers: [
        {
          provide: PasswordService,
          useValue: {
            updatePassword: jest.fn().mockReturnValue(true),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    passwordController = module.get<PasswordController>(PasswordController);
    passwordService = module.get<PasswordService>(PasswordService);
  });

  describe('updatePassword', () => {
    it('should call passwordService.updatePassword with correct param and return true', async () => {
      const result = passwordController.updatePassword(id, { password });

      expect(passwordService.updatePassword).toBeCalledWith(id, password);
      expect(result).toBe(true);
    });
  });
});
