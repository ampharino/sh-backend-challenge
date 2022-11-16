import { CompanyRepository } from './repository';
import request from 'supertest';
import companyRouter from './route';
import express from 'express';
import bodyParser from 'body-parser';

describe('/company tests', () => {
  beforeEach(jest.restoreAllMocks);
  const app = express().use(bodyParser.json()).use('/company', companyRouter);

  describe('POST /company', () => {
    it('should return status 400 with error message if company already exists', (done) => {
      jest
        .spyOn(CompanyRepository, 'findCompanyByName')
        .mockResolvedValue({} as any);
      request(app)
        .post('/company')
        .send({ name: 'company a' })
        .expect(400)
        .expect({ message: 'Company with that name already exists' }, done);
    });
  });
});
