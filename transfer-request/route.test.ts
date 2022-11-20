import bodyParser from 'body-parser';
import express from 'express';
import transferRequestRouter from './route';
import request from 'supertest';
import { TransferRequestRepository } from './repository';
import { Model } from 'sequelize';
import { EmployeeRepository } from '../employee/repository';
import { REQUEST_LIMIT_EXCEED } from '../errors';

describe('/transfer-request', () => {
  beforeEach(jest.restoreAllMocks);
  const app = express()
    .use(bodyParser.json())
    .use('/transfer-request', transferRequestRouter);

  describe('POST /transfer-request', () => {
    it('should return status 400 if requested amount is negative', (done) => {
      request(app)
        .post('/transfer-request')
        .set('employeeId', '1')
        .send({ amount: -100 })
        .expect(400)
        .expect(
          [
            {
              code: 'too_small',
              minimum: 0,
              type: 'number',
              inclusive: false,
              message: 'Number must be greater than 0',
              path: ['body', 'amount'],
            },
          ],
          done
        );
    });
    it('should return status 401 if no employeeId', (done) => {
      request(app)
        .post('/transfer-request')
        .send({ amount: 200 })
        .expect(401, done);
    });
    it('should return status 400 if total amount requested for month exceeds 50% of salary', (done) => {
      jest
        .spyOn(TransferRequestRepository, 'getRequestsForCurrentMonth')
        .mockResolvedValue([
          { dataValues: { amount: 10 } } as Model,
          { dataValues: { amount: 10 } } as Model,
          { dataValues: { amount: 30 } } as Model,
        ]);
      jest
        .spyOn(EmployeeRepository, 'findEmployeeByPk')
        .mockResolvedValue({ dataValues: { salary: 100 } } as Model);
      request(app)
        .post('/transfer-request')
        .set('employeeId', '1')
        .send({ amount: 10 })
        .expect(400)
        .expect({ message: REQUEST_LIMIT_EXCEED }, done);
    });
    it('should return status 400 if total amount requested for month exceeds 50% of salary', (done) => {
      jest
        .spyOn(TransferRequestRepository, 'getRequestsForCurrentMonth')
        .mockResolvedValue([
          { dataValues: { amount: 10 } } as Model,
          { dataValues: { amount: 10 } } as Model,
          { dataValues: { amount: 10 } } as Model,
        ]);
      jest
        .spyOn(TransferRequestRepository, 'createTransferRequest')
        .mockResolvedValue();
      jest
        .spyOn(EmployeeRepository, 'findEmployeeByPk')
        .mockResolvedValue({ dataValues: { salary: 100 } } as Model);
      request(app)
        .post('/transfer-request')
        .set('employeeId', '1')
        .send({ amount: 20 })
        .expect(201, done);
    });
  });
});
