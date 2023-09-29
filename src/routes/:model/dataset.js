import services from "../../lib/services.js"

export async function get(req, res) {
  const result = await services.list(req.params.model, req.query)
  res.send({data: result})
}