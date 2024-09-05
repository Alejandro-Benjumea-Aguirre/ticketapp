const response = require('../../helpers/response')
const serviceAuth = require('./serviceAuth')

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    response.error(req, res, 'El nombre de usuario y la contraseña son obligatorios.', 400);
  }

  try {
    const {user, token} = await serviceAuth.login(username, password);

    if (!user || !token) {
      response.error(req, res, 'Credenciales inválidas.', 401);
    }

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });
    response.success(req, res, user, 200);
  } catch (error) {
    console.error('Error en la función de login:', error);
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const newToken = async (req, res) => {
  const id = req.body

  if (!id) {
    response.error(req, res, 'El id del usuario es obligatorio.', 400);
  }

  try {
    const {user, token} = await serviceAuth.newToken(id);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });
    response.success(req, res, user, 200)
  } catch (error) {
    console.error('Error obteniento el nuevo token:', error);
    response.error(req, res, 'Hable con el administrador', 500)
  }
  
}

const sendToken = async (req, res) => {
  const { username } = req.body

  if (!username) {
    response.error(req, res, 'El username es obligatorio.', 400)
  }

  try {
    const resp = await serviceAuth.sendToken(username)
    response.success(req, res, resp, 200)
  } catch (error) {
    console.error('Error en el envio del correo con el token:', error);
    response.error(req, res, 'Hable con el administrador', 500)
  }
  
}

const compareToken = async (req, res) => {
  const { token, username } = req.body

  if (!token || !username) {
    response.error(req, res, 'El token y el username es obligatorio.', 400)
  }

  try {
    const resp = await serviceAuth.compareToken(token, username, 10)
    if (resp.status) {
      response.success(req, res, resp, 200)
    }
  } catch (error) {
    console.error('Error en el envio del correo con el token:', error);
    response.error(req, res, 'Hable con el administrador', 500)
  }
  
}

module.exports = { login, newToken, sendToken, compareToken }

