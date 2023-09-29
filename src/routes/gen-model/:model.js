export async function get(req, res) {
  try {
    const model = (await import(`../../models/${req.params.model}.js`)).default
    res.send(model)
  } catch (err) {
    res.send({})
  }
}