/**
 * Añade un shim getDataValue() al documento de Mongoose
 * para mantener compatibilidad con el código de servicios que
 * espera la interfaz de Sequelize.
 */
const withGetDataValue = (doc) => {
  if (!doc) return doc
  const plain = doc.toObject ? doc.toObject() : { ...doc }
  plain.getDataValue = (field) => plain[field]
  return plain
}

module.exports = { withGetDataValue }
