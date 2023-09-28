import services from "../../lib/services.js"

export async function service(req, res) {
  const result = await services.delete(req.params.model, req.body.id)
  res.send({data: result})
}