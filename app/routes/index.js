const express = require('express')
const fs = require('fs')

const router = express.Router()

const pathRouter = `${__dirname}`

const removeExt = (dir) => {
  return dir.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExt(file)
  const skip = ['index'].includes(fileWithOutExt)
  if (!skip) {
    return router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`))
  }
  return ''
})

router.get('*', (req, res) => {
  res.status(404)
  res.send({ error: 'Not found' })
})

module.exports = router
