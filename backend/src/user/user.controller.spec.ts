import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IGetUsers, IUser } from './models/user';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUsers: IGetUsers = {
    id: 1,
    name: 'John Smith',
    email: 'john@smith.com',
    blocked: false,
    role: 'USER',
    login_attempts: 2,
    login_lockout: false,
    last_login_attempt: '123',
    lockout_time: '12345',
  };

  const mockUser = {
    name: 'Peter Smith',
    email: 'peter@smith.com',
    password: 'password',
    blocked: false,
    role: 'USER',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn().mockReturnValue([mockUsers]),
            create: jest.fn().mockReturnValue({
              ...mockUser,
              id: 2,
              login_attempts: 3,
              login_lockout: false,
              last_login_attempt: '123',
              lockout_time: '12345',
            }),
            update: jest.fn().mockReturnValue(true),
            getMe: jest.fn().mockReturnValue({
              ...mockUser,
              id: 2,
              login_attempts: 3,
              login_lockout: false,
              last_login_attempt: '123',
              lockout_time: '12345',
            }),
            deleteUser: jest.fn().mockReturnValue(true),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should call userService.getUsers and get all users', async () => {
      const result = await userController.getUsers();

      expect(userService.getAll).toBeCalled();
      expect(result).toStrictEqual([mockUsers]);
    });
  });

  describe('createUser', () => {
    const mockReq = {
      body: mockUser,
    };

    it('should call userService.create with correct params and return created user', async () => {
      const result = await userController.create(mockReq);

      expect(userService.create).toBeCalledWith(mockUser);
      expect(result).toEqual({
        ...mockUser,
        id: 2,
        login_attempts: 3,
        login_lockout: false,
        last_login_attempt: '123',
        lockout_time: '12345',
      });
    });
  });

  describe('update', () => {
    const mockUpdateUser: IUser = {
      id: 2,
      name: 'Peter Smith',
      email: 'peter@smith.com',
      password: 'password',
      blocked: false,
      role: 'USER',
      login_attempts: 3,
      login_lockout: false,
      last_login_attempt: '123',
      lockout_time: '12345',
    };

    it('should call userService.update with correct params and return result', async () => {
      const result = await userController.update(2, mockUpdateUser);

      expect(userService.update).toBeCalledWith(2, mockUpdateUser);
      expect(result).toBe(true);
    });
  });

  describe('getSingleUser', () => {
    it('should call userService.getMe and return the user', async () => {
      const result = await userController.getUser(2);

      expect(userService.getMe).toBeCalledWith(2);
      expect(result).toEqual({
        ...mockUser,
        id: 2,
        login_attempts: 3,
        login_lockout: false,
        last_login_attempt: '123',
        lockout_time: '12345',
      });
    });
  });

  describe('deleteUser', () => {
    it('should call userService.deleteUser and return true/false', async () => {
      const result = await userController.deleteUser(2);

      expect(userService.deleteUser).toBeCalledWith(2);
      expect(result).toBe(true);
    });

    it('should throw error if user does not exist', async () => {
      jest.spyOn(userService, 'deleteUser').mockImplementation(() => {
        throw new Error('User not found');
      });

      await expect(userController.deleteUser(2)).rejects.toThrow(
        'User not found',
      );
    });
  });
});
