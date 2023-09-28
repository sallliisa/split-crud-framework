import services from "../../lib/services.js"

export async function service(req, res) {
  const result = await services.list(req.params.model)
  res.send({data: result})
}