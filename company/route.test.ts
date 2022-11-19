import { ClientAdminRepository } from './../client-admin/repository';
import { CompanyRepository } from './repository';
import request from 'supertest';
import companyRouter from './route';
import express from 'express';
import bodyParser from 'body-parser';
import { EmployeeRepository } from '../employee/repository';

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
  describe('POST /company/:companyId/client-admin', () => {
    it('should return status 400 with error message if name is not string', (done) => {
      request(app)
        .post('/company/1/client-admin')
        .send({ name: 123 })
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
    it('should return status 400 with error message if companyId is not number', (done) => {
      request(app)
        .post('/company/dsafdsafa/client-admin')
        .send({ name: 'John Smith' })
        .expect(400)
        .expect(
          [
            {
              code: 'invalid_type',
              expected: 'number',
              received: 'nan',
              path: ['params', 'companyId'],
              message: 'Expected number, received nan',
            },
          ],
          done
        );
    });
    it('should return status 400 with error message if company does not exist', (done) => {
      jest.spyOn(CompanyRepository, 'findCompanyById').mockResolvedValue(null);

      request(app)
        .post('/company/10/client-admin')
        .send({ name: 'John Smith' })
        .expect(400)
        .expect({ message: 'Company with id 10 does not exist' }, done);
    });
    it('should return status 400 with error message if client admin with same name already exist for company', (done) => {
      jest
        .spyOn(CompanyRepository, 'findCompanyById')
        .mockResolvedValue({} as any);
      jest
        .spyOn(ClientAdminRepository, 'getClientAdminByName')
        .mockResolvedValue({} as any);

      request(app)
        .post('/company/10/client-admin')
        .send({ name: 'John Smith' })
        .expect(400)
        .expect(
          {
            message: 'This company already has a client admin named John Smith',
          },
          done
        );
    });
    it('should return status 201 if successfully created client admin', (done) => {
      jest
        .spyOn(CompanyRepository, 'findCompanyById')
        .mockResolvedValue({} as any);
      jest
        .spyOn(ClientAdminRepository, 'getClientAdminByName')
        .mockResolvedValue(null);
      jest
        .spyOn(ClientAdminRepository, 'createClientAdmin')
        .mockResolvedValue();

      request(app)
        .post('/company/10/client-admin')
        .send({ name: 'John Smith' })
        .expect(201, done);
    });
  });
  describe('POST /company/:companyId/employee', () => {
    it('should return status 401 if not authenticated', (done) => {
      request(app)
        .post('/company/1/employee')
        .send({ name: 'John Smith', employeeId: 123 })
        .expect(401, done);
    });
    it('should return status 403 if not authorized', (done) => {
      jest
        .spyOn(ClientAdminRepository, 'getClientAdminById')
        .mockResolvedValue(null);
      jest
        .spyOn(CompanyRepository, 'findCompanyById')
        .mockResolvedValue({} as any);

      request(app)
        .post('/company/1/employee')
        .set('clientAdminId', '10')
        .send({ name: 'John Smith', employeeId: 123 })
        .expect(403, done);
    });
    it('should return status 400 with error message if employee already exists', (done) => {
      jest
        .spyOn(ClientAdminRepository, 'getClientAdminById')
        .mockResolvedValue({} as any);
      jest
        .spyOn(CompanyRepository, 'findCompanyById')
        .mockResolvedValue({} as any);
      jest
        .spyOn(EmployeeRepository, 'findEmployeeById')
        .mockResolvedValue({} as any);

      request(app)
        .post('/company/1/employee')
        .set('clientAdminId', '10')
        .send({ name: 'John Smith', employeeId: 123 })
        .expect(400)
        .expect(
          { message: `This company already has an employee with id 123` },
          done
        );
    });
    it('should return status 400 with error message if company does not exist', (done) => {
      jest
        .spyOn(ClientAdminRepository, 'getClientAdminById')
        .mockResolvedValue({} as any);
      jest.spyOn(CompanyRepository, 'findCompanyById').mockResolvedValue(null);

      request(app)
        .post('/company/1/employee')
        .set('clientAdminId', '10')
        .send({ name: 'John Smith', employeeId: 123 })
        .expect(400)
        .expect({ message: `Company with id 1 does not exist` }, done);
    });
    it('should return status 201 if successfully created employee', (done) => {
      jest
        .spyOn(ClientAdminRepository, 'getClientAdminById')
        .mockResolvedValue({} as any);
      jest
        .spyOn(CompanyRepository, 'findCompanyById')
        .mockResolvedValue({} as any);
      jest
        .spyOn(EmployeeRepository, 'findEmployeeById')
        .mockResolvedValue(null);
      jest.spyOn(EmployeeRepository, 'createEmployee').mockResolvedValue();

      request(app)
        .post('/company/1/employee')
        .set('clientAdminId', '10')
        .send({ name: 'John Smith', employeeId: 123 })
        .expect(201, done);
    });
  });
});
