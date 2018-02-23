import {join} from 'path'
import mongoose from 'mongoose'
import glob from 'glob'
import config from '../config'
const {DB_URL} = config
mongoose.Promise = global.Promise

glob.sync(join(__dirname, '../db/schema', '**/*.js')).forEach(require)

export const database = app => {

  if (config.env === 'development') {
    mongoose.set('debug', true)
  }

  mongoose.connect(DB_URL)

  const db = mongoose.connection

  db.on('disconnected', () => {
    mongoose.connect(DB_URL)
  })

  db.on('error', err => {
    console.error(err)
  })

  db.once('open', () => {
    console.log('Connected to MongoDB -> ', DB_URL)
  })
}
