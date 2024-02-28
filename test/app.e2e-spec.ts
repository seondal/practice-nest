import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('Get', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('Post 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2001,
          genres: ['action'],
        })
        .expect(201);
    });

    it('delete', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('get 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('patch', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });

    it('delete', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it('Post 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2001,
          genres: ['action'],
          other: 'thing',
        })
        .expect(201);
    });
  });
});
