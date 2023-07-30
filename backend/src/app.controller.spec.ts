import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    const req = {
      body: {
        email: 'test@test.com',
        password: 'password',
      },
    };
    const mockResponse = { result: 'test', jwt: 'jwt' };

    it('should call authService.validateUser and return the result if auth', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockResponse);

      const result = await appController.login(req);

      expect(authService.validateUser).toBeCalledWith(
        req.body.email,
        req.body.password,
      );
      expect(result).toBe(mockResponse);
    });

    it('should handle error', async () => {
      jest.spyOn(authService, 'validateUser').mockImplementation(() => {
        throw new UnauthorizedException();
      });

      await expect(appController.login(req)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
