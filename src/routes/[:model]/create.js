import services from "../../lib/services.js"

export async function service(req, res) {
  const result = await services.create(req.params.model, req.body)
  res.send({data: result})
}