import services from "../../../lib/services.js"

export async function get(req, res) {
  const result = await services.single(req.params.model, req.params.id)
  res.send({data: result})
}