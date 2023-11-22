import app from './app'
import mongoose from 'mongoose'
import config from './config'

async function server() {
  try {
    await mongoose.connect(config.databaseUrlLocal)

    app.listen(Number(config.port), () => {
      console.log(`Example app listening on port ${config.port} successfully`)
    })
  } catch (error) {
    console.log('db not connected: ', error)
  }
}

server().catch((err) => console.log(err))
