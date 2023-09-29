export async function getConfig(model) {
  return (await import(`../models/${model}.js`)).default || null
}

export async function getRelationQuery(model) {
  const fieldRelation = (await getConfig(model)).fieldRelation

  let relationJoin = ""
  let relationQuery = ""

  Object.keys(fieldRelation).forEach(key => {
    relationJoin += `LEFT JOIN ${fieldRelation[key]['linkTable']} ${fieldRelation[key]['aliasTable']} ON ${model}.${key} = ${fieldRelation[key]['aliasTable']}.${fieldRelation[key]['linkField']}`
    Object.keys(fieldRelation[key].selectFields).forEach(field => {
      relationQuery += `, ${fieldRelation[key]['aliasTable']}.${field} AS ${fieldRelation[key].selectFields[field]}`
    })
  })

  return {relationQuery, relationJoin}
}

export async function getSearchQuery(model, term) {
  return (await getConfig(model)).fieldSearchable
    .map(field => `UPPER(${field}) LIKE '%${term}%'`)
    .join(' OR ')
}

export async function getDataQuery(model, parameters) {
  return Object.keys(parameters).map(field => parameters[field] ? `${field}='${parameters[field]}'` : null).filter(item => !!item).join(' AND ')
}