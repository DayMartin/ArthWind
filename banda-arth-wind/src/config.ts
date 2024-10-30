import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

const production = process.env.NODE_ENV === 'production';
const demo = process.env.DEMO === 'true';

const db_host = process.env.DB_HOST || 'localhost';
const db_port = process.env.DB_PORT || '3306';
const userdb = process.env.USERDB || 'dinahdoria';
const passdb = process.env.PASSDB || 'arthwind';
const database = process.env.DATABASE || 'musicalidade';

export const typeormModule: DataSourceOptions = {
  type: 'mysql',
  host: db_host,
  port: Number(db_port),
  username: userdb,
  password: passdb,
  database: database,
  synchronize: !production,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: !production,
};

export default {
  demo,
  production,
  port: 3000,

  jwt: {
    secret:
      'Chung3ko pei8aiJu xa5ibieV onohN0na ohn8Ugoh ahb6uMai roHoo8ie Lie0AiX1',
    signOptions: { expiresIn: '12h' },
  },
  smtp: {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
