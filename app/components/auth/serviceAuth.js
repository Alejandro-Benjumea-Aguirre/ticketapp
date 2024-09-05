const bcrypt = require('bcrypt');

const repositorieUser = require('../users/repositorieUser');
const generarJWT = require('../../helpers/generateJWT');
const sendEmail = require('../../helpers/sendEmail');
const { cadenaAleatoria } = require('../../helpers/helpers');
const htmlToken = require('../../../views/emails/enviotoken');

const login = async (username, password) => {
  try {
    const user = await repositorieUser.listByUsername(username);
    if (!user) {
      throw new Error('Usuario/contraseña incorrectos.');
    }

    // Verificacion de password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new Error('Usuario/contraseña incorrectos.')
    }

    // Generar JWT
    const token = await generarJWT(user.uid);

    return {
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
      token
    }
  } catch (error) {
    throw new Error(error.message || 'Error en el proceso de autenticación.');
  }
  
}

const newToken = async (id) => {
  try {
    // Verificar si el usuario existe por ID
    const user = await repositorieUser.listById(id)

    if (!user) {
      throw new Error('El usuario no existe.')
    }

    const token = await generarJWT(String(id))

    return {
      user: {
        name: user.getDataValue('name'),
        username: user.getDataValue('username'),
        email: user.getDataValue('email'),
      },    
      token
    }
  } catch (error) {
    throw new Error(error.message || 'Error al generar un nuevo token.');
  }
}

const sendToken = async (username) => {
  try {
    const user = await repositorieUser.listByUsername(username)

    if (!user) {
      throw new Error('Usuario no existe.');
    }

    const token = cadenaAleatoria(6)

    if(!token){
      throw new Error('Error en la generación del token.');
    }

    const to = user.email
    const subject = 'Recuepracion de contraseña'
    const text = `Para la recuepracion de su contraseña se ha creado el siguiente token el cual 
                  debe de ser ingresado en el aplicativo y luego deben de cambiar la contraseña.
                  Token = ${token}`
    const html = htmlToken

    // Enviar el correo electrónico con el token
    const respEmail = await sendEmail(to, subject, text, html)

    if (!respEmail) {
      throw new Error('No se pudo enviar el correo.')
    }

    // Guardar el token en la base de datos
    await repositorieUser.sendToken(token, user.uid);

    return { success: true, message: 'Token enviado exitosamente.' };
  } catch (error) {
    // Manejar errores y lanzar un mensaje de error claro
    throw new Error(error.message || 'Error en el envío del correo con el token.');
  }
  
}

const compareToken = async (token, userId, time) => {
  try {
    const resp = repositorieUser.compareToken(token, userId, time)

    if (!resp) {
      throw new Error('No coincide el token o el tiempo ya expiro')
    } 
    
    return {
      status: true,
      msg: 'El token coincide con el usuario.'
    };
    
  } catch (error) {
    throw new Error(error.message || 'Error al comparar el token.');
  }
  
}

module.exports = { login, newToken, sendToken, compareToken }

