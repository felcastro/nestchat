import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  const mockConnection = {
    query: () => null,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [{ provide: Connection, useValue: mockConnection }],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return status ok', async () => {
      const response = await appController.root();

      expect(response).toStrictEqual({ status: 'ok' });
    });
  });

  describe('status', () => {
    it('should return application status successfully', async () => {
      mockConnection.query = () => [
        {
          database: 'CONNECTED',
        },
      ];
      const response = await appController.status();

      expect(response).toStrictEqual({ database: 'CONNECTED' });
    });

    it('should return error 500', async () => {
      mockConnection.query = () => {
        throw new InternalServerErrorException();
      };
      try {
        await appController.status();

        fail('Should throw error 500');
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
