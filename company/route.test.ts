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
    it('should return status 400 with validation error message if name is not a string', (done) => {
      request(app)
        .post('/company')
        .send({ name: 123415 })
        .expect(400)
        .expect(
          [
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'number',
              path: ['body', 'name'],
              message: 'Expected string, received number',
            },
          ],
          done
        );
    });
    it('should return status 400 with validation error message if name is empty', (done) => {
      request(app)
        .post('/company')
        .send({ name: '' })
        .expect(400)
        .expect(
          [
            {
              code: 'too_small',
              minimum: 1,
              type: 'string',
              inclusive: true,
              message: 'String must contain at least 1 character(s)',
              path: ['body', 'name'],
            },
          ],
          done
        );
    });
    it('should return status 201 if successfully created company', (done) => {
      jest
        .spyOn(CompanyRepository, 'findCompanyByName')
        .mockResolvedValue(null);
      jest.spyOn(CompanyRepository, 'createCompany').mockResolvedValue();

      request(app)
        .post('/company')
        .send({ name: 'company a' })
        .expect(201, done);
    });
  });
});
