class DefaultConfig {
  public readonly MONGO_URI = 'mongodb://localhost:27017/fan-tv-database';
  public readonly PORT = '9000';
  public readonly BASE_PATH = '/api/v1';
  public readonly JWT_SECRET = '1234';
}

export const defaultConfig: DefaultConfig = new DefaultConfig();
