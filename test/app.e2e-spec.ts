import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /swapis/peoples', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(app.getHttpServer()).get('/swapis/peoples/1').send();
      expect(response.status).toBe(200);    
    });
  
    it('should respond with an array', async () => {
      const response = await request(app.getHttpServer()).get('/swapis/peoples/1').send();
      expect(response.body).toBeInstanceOf(Array);    
    });
  });
  
  describe('GET /swapis/planets', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(app.getHttpServer()).get('/swapis/planets/1').send();
      expect(response.status).toBe(200);    
    });
  
    it('should respond with an array', async () => {
      const response = await request(app.getHttpServer()).get('/swapis/planets/1').send();
      expect(response.body).toBeInstanceOf(Array);    
    });
  });
  
  describe('GET /swapis/fusions', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(app.getHttpServer()).get('/swapis/fusions/1').send();
      expect(response.status).toBe(200);    
    });
  
    it('should respond with an array', async () => {
      const response = await request(app.getHttpServer()).get('/swapis/fusions/1').send();
      expect(response.body).toBeInstanceOf(Array);    
    });
  });

});
