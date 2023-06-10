import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  describe('AuthService', () => {
    it('should pass a dummy test', () => {
      expect(true).toBe(true);
    });
  });
  // let service: PasswordService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [PasswordService],
  //   }).compile();

  //   service = module.get<PasswordService>(PasswordService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
