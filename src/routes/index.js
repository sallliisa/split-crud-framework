import express from 'express'

const router = express.Router()

const menu = [
  {path: '/login', method: 'post', service: (await import('./login.js')).service},
  {path: '/:model/create', method: 'post', service: (await import('./[:model]/create.js')).service},
  {path: '/:model/update', method: 'put', service: (await import('./[:model]/update.js')).service},
  {path: '/:model/list', method: 'get', service: (await import('./[:model]/list.js')).service},
  {path: '/:model/dataset', method: 'get', service: (await import('./[:model]/dataset.js')).service},
  {path: '/:model/:id/show', method: 'get', service: (await import('./[:model]/show.js')).service},
  {path: '/:model/delete', method: 'delete', service: (await import('./[:model]/delete.js')).service},
]

for (const item of menu) {
  router[item.method](item.path, item.service)
}

export default router