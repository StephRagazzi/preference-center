import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { connection } from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('responds a welcome string to the API root url', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('responds with a 404 error when a user does not exist', () => {
    return request(app.getHttpServer())
      .get('/users/unknown')
      .expect(404)
      .expect({ statusCode: 404, message: 'User not found!' });
  });

  it('responds with a 422 error if no ID defined', () => {
    const user = { id: '', email: 'user99@email.com', consents: [] };
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(422)
      .expect({ status: 422, error: 'UserConsent validation failed: id: Path `id` is required.' });
  });
});
