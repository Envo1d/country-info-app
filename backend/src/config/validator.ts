import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Max,
  Min,
  validateSync,
  IsUrl,
} from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  @Min(3001)
  @Max(65535)
  PORT: number;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  COUNTRIES_NOW_BASE_URL: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  DATE_NAGER_BASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
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
