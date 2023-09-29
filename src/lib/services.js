import db from "./db.js"
import { getConfig, getRelationQuery, getSearchQuery, getDataQuery } from "./utils.js"

const services = {
  list: async function (model, parameters) {
    const config = await getConfig(model)
    
    const {relationQuery, relationJoin} = config.fieldRelation ? await getRelationQuery(model) : {relationQuery: "", relationJoin: ""}

    const filterSearchQuery = config.fieldSearchable && parameters.search ? `(${await getSearchQuery(model, parameters.search)})` : null
    const generatedDataQuery = config.fieldFilterable ? await getDataQuery(model, {...parameters, search: undefined, page: undefined, limit: undefined}) : null
    const filterDataQuery = generatedDataQuery ? `(${generatedDataQuery})` : null

    const filterQuery = filterSearchQuery && filterDataQuery ? [filterSearchQuery, filterDataQuery].join(' AND ') : filterSearchQuery ?? filterDataQuery
    const limit = Number(parameters.limit ?? 10)
    const offset = (Number(parameters.page ?? 1)-1)*limit

    const [data] = await db.query(`SELECT ${model}.* ${relationQuery} FROM ${model} ${relationJoin} ${filterQuery ? `WHERE TRUE AND ${filterQuery}` : ''} LIMIT ${limit} OFFSET ${offset}`)
    return data
  },
  single: async function (model, id) {
    const config = await getConfig(model)
    const {relationQuery, relationJoin} = config.fieldRelation ? getRelationQuery(model) : {relationQuery: "", relationJoin: ""}
    const identifier = config.identifier ?? 'id'
    const [data] = await db.query(`SELECT ${model}.* ${relationQuery} FROM ${model} ${relationJoin} WHERE ${model}.${identifier}=?`, [id])
    return data[0]
  },
  delete: async function (model, id) {
    const config = await getConfig(model)
    const identifier = config.identifier ?? 'id'
    const [res] = await db.query(`DELETE FROM ${model} WHERE ${identifier}=?`, [id])
    return res
  },
  create: async function (model, data) {
    const config = await getConfig(model)
    if (!config?.fieldCreate?.length) return
    const [res] = await db.query(`INSERT INTO ${model} (${config.fieldCreate.join(',')}) VALUES (${Array(config.fieldCreate.length).fill('?').join(',')})`, config.fieldCreate.map(field => data[field]))
    return res
  },
  update: async function (model, data) {
    const config = await getConfig(model)
    if (!config?.fieldUpdate?.length) return
    const identifier = config.identifier ?? 'id'
    const [res] = await db.query(`UPDATE ${model} SET ${config.fieldUpdate.map(key => `${key}=?`).join(',')} WHERE ${identifier}=?`, [...config.fieldUpdate.map(field => data[field]), data[identifier]])
    return res
  }
}

export default services