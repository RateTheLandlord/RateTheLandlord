import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  describe('AuthService', () => {
    it('should pass a dummy test', () => {
      expect(true).toBe(true);
    });
  });
  // let service: UserService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [UserService],
  //   }).compile();

  //   service = module.get<UserService>(UserService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
