/**
 * Middleware de sanitización XSS
 * Recorre recursivamente el body, query y params eliminando
 * etiquetas HTML/JS peligrosas de todos los strings.
 */

const XSS_PATTERN = /<[^>]*>|javascript\s*:/gi

const sanitizeValue = (value) => {
  if (typeof value === 'string') {
    return value.replace(XSS_PATTERN, '').trim()
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }
  if (value !== null && typeof value === 'object') {
    return sanitizeObject(value)
  }
  return value
}

const sanitizeObject = (obj) => {
  const clean = {}
  for (const key of Object.keys(obj)) {
    clean[key] = sanitizeValue(obj[key])
  }
  return clean
}

const sanitize = (req, res, next) => {
  if (req.body)   req.body   = sanitizeObject(req.body)
  if (req.query)  req.query  = sanitizeObject(req.query)
  if (req.params) req.params = sanitizeObject(req.params)
  next()
}

module.exports = sanitize
