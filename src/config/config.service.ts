import { Injectable, Logger } from '@nestjs/common';
import { DotenvParseOutput, parse } from 'dotenv';
import { readFileSync } from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string | undefined };

  constructor() {
    const filePath = '.env';
    let dotenvContent: DotenvParseOutput;
    try {
      const fileContents = readFileSync(filePath);
      dotenvContent = parse(fileContents);
    } catch (ignored) {
      Logger.warn(
        'não foi possível ler o arquivo .env -- continuando apenas com as variáveis de ambiente',
      );
    }

    this.envConfig = { ...dotenvContent, ...process.env };
  }

  get(key: string): string {
    const maybeValue = this.envConfig[key];

    if (maybeValue) {
      return maybeValue;
    }

    throw new Error(`Não há valor cadastrado no env para a chave ${key}`);
  }
}
