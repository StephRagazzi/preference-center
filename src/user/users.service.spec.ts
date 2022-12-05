import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { IUserConsent } from '../interfaces/userConsent.interface';
import { Model } from 'mongoose';

const mockUser = {
  id: '1234',
  email: 'joe@email.com',
  consents: []
};

const usersArray = [
  {
    id: '5678',
    email: 'jack@email.com',
    consents: []
  },
  {
    id: '5555',
    email: 'bill@email.com',
    consents: []
  },
];

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<IUserConsent>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USERCONSENT_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            deleteMany: jest.fn(),
            findOne: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get(UsersService);
    model = module.get<Model<IUserConsent>>('USERCONSENT_MODEL');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const allUsers = await service.findAll();
    expect(allUsers).toEqual(usersArray);
  });

  it('should create a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        id: '1234',
        email: 'joe@email.com',
        consents: []
      })
    );
    const newUser = await service.create({
      id: '1234',
      email: 'joe@email.com',
      consents: []
    });
    expect(newUser).toEqual(mockUser);
  });

  it('should delete all users', async () => {
    jest.spyOn(model, 'deleteMany').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce({
        acknowledged: true,
        deletedCount: 2,
      }),
    } as any);
    const deleteResult = await service.deleteAll();
    expect(deleteResult['deletedCount']).toEqual(2);
  });

  it('should get a user by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser) as any,
    } as any);

    const user = await service.getUser('1234');
    expect(user.id).toEqual('1234');
  });

});