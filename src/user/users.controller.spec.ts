import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([
                            {
                                id: '1234',
                                email: 'jack@email.com',
                                consents: [],
                            },
                            {
                                id: '5678',
                                email: 'joe@email.com',
                                consents: [],
                            },
                            {
                                id: '9876',
                                email: 'bill@email.com',
                                consents: [],
                            },
                        ]),
                        create: jest.fn().mockImplementation((createUserDto: CreateUserDto) =>
                            Promise.resolve({ _id: '1', ...createUserDto }),
                        ),
                        getUser: jest.fn().mockResolvedValue([
                            {
                                id: '1357',
                                email: 'jack@email.com',
                                consents: [],
                            }
                        ]),

                        deleteAll: jest.fn().mockImplementation(() => Promise.resolve([
                            {
                                acknowledged: true,
                                deletedCount: 5
                            }
                        ]))
                    }
                },
            ],
        }).compile();
        controller = module.get(UsersController);
        service = module.get(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create()', () => {
        it('should create a new user', async () => {
            const createUserDto: CreateUserDto = {
                id: '1011',
                email: 'john@email.com',
                consents: [],
            };
            expect(controller.create(createUserDto)).resolves.toEqual({
                _id: '1',
                ...createUserDto,
            });
        });
    });

    describe('findAll()', () => {
        it('should get an array of all users', () => {
            expect(controller.findAll()).resolves.toEqual([
                {
                    id: '1234',
                    email: 'jack@email.com',
                    consents: []
                },
                {
                    id: '5678',
                    email: 'joe@email.com',
                    consents: []
                },
                {
                    id: '9876',
                    email: 'bill@email.com',
                    consents: []
                },
            ]);
        });
    });

    describe('getUser()', () => {
        it('should get a specific user', () => {
            expect(controller.getUser('1357')).resolves.toEqual([
                {
                    id: '1357',
                    email: 'jack@email.com',
                    consents: []
                }
            ]);
        });
    });

    describe('deleteAll()', () => {
        it('should get the number of deleted users', () => {
            expect(controller.deleteAll()).resolves.toEqual([
                {
                    acknowledged: true,
                    deletedCount: 5
                }
            ]);
        });
    })

});