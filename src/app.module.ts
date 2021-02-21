import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserTable1613524164306 } from 'migration/1613524164306-CreateUserTable';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.envConfig.dbHost,
        port: configService.envConfig.dbPort,
        database: configService.envConfig.dbName,
        username: configService.envConfig.dbUsername,
        password: configService.envConfig.dbPassword,
        entities: [User],
        synchronize: false,
        migrationsRun: true,
        retryAttempts: 1,
        migrations: [CreateUserTable1613524164306],
      }),
    }),
    UserModule,
    AuthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
  controllers: [AppController],
})
export class AppModule {}
