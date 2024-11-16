import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;
}

export function validate(config: EnvironmentVariables) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

@Injectable()
export class EnvironmentConfigService {
  constructor(
    @Inject(ConfigService)
    private config: ConfigService<EnvironmentVariables>,
  ) {}

  getPort() {
    return this.config.get<string>('PORT');
  }
  getDbHost() {
    return this.config.get<string>('DB_HOST');
  }
  getDbPort() {
    return this.config.get<string>('DB_PORT');
  }
  getDbUser() {
    return this.config.get<string>('DB_USER');
  }
  getDbPassword() {
    return this.config.get<string>('DB_PASSWORD');
  }
  getDbName() {
    return this.config.get<string>('DB_NAME');
  }
  getDbUrl() {
    return this.config.get<string>('DATABASE_URL');
  }
  getJwtSecret() {
    return this.config.get<string>('JWT_SECRET');
  }
}
