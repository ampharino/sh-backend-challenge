import { createTransferRequest } from './service';
import TransferRequest from './model';
import sequelize from '../database';
import { Op } from 'sequelize';

export const TransferRequestRepository = {
  getRequestsForCurrentMonth: async (employeeId: number) => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    return await TransferRequest.findAll({
      where: {
        employeeId,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
  },
  createTransferRequest: async (amount: number, employeeId: number) => {
    await TransferRequest.create({ amount, employeeId });
  },
};
