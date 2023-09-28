import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

const db = await mysql.createConnection({
  host: "localhost",
  user: "gamer",
  password: "12345",
  database: "bookorama",
  Promise: bluebird
})

export default db