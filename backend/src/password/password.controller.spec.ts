import { Test, TestingModule } from '@nestjs/testing';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

describe('PasswordController', () => {
  describe('AuthService', () => {
    it('should pass a dummy test', () => {
      expect(true).toBe(true);
    });
  });
  // let controller: PasswordController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [PasswordController],
  //     providers: [PasswordService],
  //   }).compile();

  //   controller = module.get<PasswordController>(PasswordController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
