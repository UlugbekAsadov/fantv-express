import bunyan from 'bunyan';
import { defaultConfig } from './default.config';
import dotenv from 'dotenv';

dotenv.config({});
class Config {
  public DATABASE_URL: string | undefined;
  public PORT: string | undefined;
  public JWT_SECRET: string | undefined;
  public BASE_PATH: string;
  public BASE_ORIGIN: string;

  constructor() {
    this.DATABASE_URL = process.env.MONGO_URI || defaultConfig.MONGO_URI;
    this.PORT = process.env.PORT || defaultConfig.PORT;
    this.JWT_SECRET = process.env.JWT_SECRET || defaultConfig.JWT_SECRET;
    this.BASE_PATH = defaultConfig.BASE_PATH;
    this.BASE_ORIGIN = defaultConfig.BASE_ORIGIN;
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }
}

export const config: Config = new Config();
