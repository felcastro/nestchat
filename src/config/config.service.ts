import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EnvConfig } from './env-config.model';
import * as dotenv from 'dotenv';
import { NodeEnv } from './enum/node-env.enum';
import { validateSync } from 'class-validator';

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly logger = new Logger(ConfigService.name);

  readonly envConfig: EnvConfig;

  constructor() {
    if (process.env.NODE_ENV !== NodeEnv.TEST) {
      dotenv.config();
    }
    try {
      this.envConfig = this.initConfig(process.env);
    } catch (err) {
      this.logger.error(err.toString());
      throw err;
    }
  }

  onModuleInit() {
    this.logger.log('Environment config initialized successfully');
  }

  protected initConfig(config: any): EnvConfig {
    const envConfig = new EnvConfig();

    envConfig.httpPort = parseInt(config.HTTP_PORT, 10);
    envConfig.env = config.ENV;
    envConfig.dbHost = config.DB_HOST;
    envConfig.dbPort = parseInt(config.DB_PORT, 10);
    envConfig.dbName = config.DB_NAME;
    envConfig.dbUsername = config.DB_USERNAME;
    envConfig.dbPassword = config.DB_PASSWORD;
    envConfig.secret = config.SECRET;

    const errors = validateSync(envConfig);

    if (errors.length) {
      throw errors.pop();
    }

    return envConfig;
  }
}
