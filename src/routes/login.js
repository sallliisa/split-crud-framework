export async function service(req, res) {
  res.send({
    token: 'hiyaimatoken',
    permissions: [],
    user: {}
  })
}