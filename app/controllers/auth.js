const response = require('../helpers/response');
const userModel = require('../models/users');
const generarJWT = require('../helpers/generateJWT');

const bcrypt = require('bcrypt');


const login = async(req, res) => {

    const { username, password } = req.body;
    try {

        //Verificacion si el usuario existe
        const usuario = await userModel.findOne({
            where: {
                username
            }
        });

        if(!usuario){
            response.success(req, res, 'Usuario/password incorrectos.', 404);
        }

        //Verificacion de password
        const validPassword = bcrypt.compareSync(password, 
            usuario.getDataValue('password'));
        if(!validPassword){
            response.success(req, res, 'Usuario/password incorrectos', 400);
        }

        //Generar JWT
        const token = await generarJWT(usuario.getDataValue('uid'));

        const respAuth = {
            name: usuario.getDataValue('name'),
            username: usuario.getDataValue('username'),
            email: usuario.getDataValue('email'),
            token: token
        }

        response.success(req, res, respAuth, 200);
        
    } catch (error) {
        response.error(req, res, 'Hable con el administrador', 500);
    }

}

const newToken = async(req, res) => {

    const uid = req.body;

    const usuario = await Usuario.findByPk(uid);

    if (!usuario){
        response.error(req, res, 'Usuario no existe.', 401);
    }

    const token = await generarJWT(String(uid));

    const respToken = {
        ame: usuario.getDataValue('name'),
        username: usuario.getDataValue('username'),
        email: usuario.getDataValue('email'),
        token: token
    }

    response.success(req, res, respToken, 200);

}

module.exports = { login, newToken }