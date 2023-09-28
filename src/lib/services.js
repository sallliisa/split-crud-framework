import db from "./db.js"

const services = {
  list: async function (model) {
    const [data] = await db.query(`SELECT * FROM ${model}`)
    return data
  },
  single: async function (model, id, identifier = 'id') {
    const [data] = await db.query(`SELECT * FROM ${model} WHERE ${identifier}=?`, [id])
    return data[0]
  },
  delete: async function (model, id, identifier = 'id') {
    const [res] = await db.query(`DELETE FROM ${model} WHERE ${identifier}=?`, [id])
    return res
  },
  create: async function (model, data) {
    const config = (await import(`../models/${model}.js`)).model
    const [res] = await db.query(`INSERT INTO ${model} (${config.fieldCreate.join(',')}) VALUES (${Array(config.fieldCreate.length).fill('?').join(',')})`, config.fieldCreate.map(field => data[field]))
    return res
  },
  update: async function (model, data, identifier = 'id') {
    const config = (await import(`../models/${model}.js`)).model
    const [res] = await db.query(`UPDATE ${model} SET ${config.fieldUpdate.map(key => `${key}=?`).join(',')} WHERE ${identifier}=?`, [...config.fieldUpdate.map(field => data[field]), data[identifier]])
    return res
  }
}

export default services