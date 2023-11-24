import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  port: process.env.PORT,
  databaseUrlLocal: process.env.DATABASE_URL_LOCAL,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
}
