const response = require('../helpers/response');
const userModel = require('../models/users');
const bcrypt = require('bcrypt');

const getUsers = async(req, res) => {

/*     res.status(200).json({ 
        status: true,
        msg: "listAll" 
    }); */

    try {
        const listAll = await userModel.findAll();
        /* res.status(200).json({ 
            status: true,
            body: listAll 
        }); */
        response.success(req,res,listAll,200);
    } catch (e) {
        response.error(req,res,e,500);
    } 
}

const getUser = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByPk( id );
        if(user){
            response.success(req,res,user,200);
        }else{
            /* return res.status(404).json({
                        status: false,
                        body: `No existe ningun usuario con el id ${id}`
                    }); */
            response.success(req,res,`No existe ningun usuario con el id ${id}`,200);
        } 
    } catch (e) {
        response.error(req,res,e,500);
    }
}

const postUser = async(req, res) => {
    const { body } = req;

    try {

        // Encriptacion de la contraseña
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync( body.password, salt );

        const usuario = userModel.build(body);
        await usuario.save();

        const respUser = {
            id: usuario.getDataValue('uid'),
            name: usuario.getDataValue('name'),
            username: usuario.getDataValue('username'),
            email: usuario.getDataValue('email'),
        }

        response.success(req,res,respUser,200);

        /* return res.json({
            ok: true,
            msg: 'Usuario creado con exito',
            body: {
                id: usuario.getDataValue('id'),
                name: usuario.getDataValue('name'),
                nickname: usuario.getDataValue('nickname'),
                email: usuario.getDataValue('email'),
            }
        }); */

    } catch (e) {
        console.log(e);
        response.error(req,res,e,500);
    }
}

const patchUser = async(req, res) => {

    const { id } = req.params;
    const { uid, password, ...body } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync( password, salt );
    }

    try {

        const usuario = await userModel.findByPk( id );

        if(!usuario){
            response.success(req,res,`No existe un usuario con el id ${id}`,404);
            /* return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id ' + id
            }); */
        }

        /* const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeEmail){
            return res.status(400).json({
                msg: "Ya existe un usuario con el Email " + body.email
            });
        } */

        await usuario.update( body );

        const respUser = {
            name: usuario.getDataValue('name'),
            username: usuario.getDataValue('username'),
            email: usuario.getDataValue('email')
        }

        response.success(req,res,respUser,200);

       /*  return res.json({
            ok: true,
            msg: `Usuario ${id} actualizado`,
            body: {
                id: usuario.getDataValue('id'),
                name: usuario.getDataValue('name'),
                nickname: usuario.getDataValue('nickname'),
                email: usuario.getDataValue('email'),
                phone: usuario.getDataValue('phone')
            }
        }); */

    } catch (error) {
        response.error(req,res,'Hable con el administrador',500);
        /* return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) */
    }


}

const deleteUser = async(req, res) => {
    const { id } = req.params;

    try {
        const usuario = await userModel.findByPk( id );

    if(!usuario){
        response.success(req,res,`No existe un usuario con el id: ${id}`,404);
        /* return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario con el id: ' + id
        }); */
    }

    await usuario.update({ state_id: 2 });

    const respUser = {
        name: usuario.getDataValue('name'),
        username: usuario.getDataValue('username'),
        email: usuario.getDataValue('email')
    }

    response.success(req,res,respUser,200);

    /* return res.json({
        ok: true,
        msg: `Usuario ${id} eliminado`,
        body: {
            id: usuario.getDataValue('id'),
            name: usuario.getDataValue('name'),
            nickname: usuario.getDataValue('nickname'),
            email: usuario.getDataValue('email'),
            phone: usuario.getDataValue('phone')
        }
    }); */
    } catch (error) {
        response.error(req,res,'Hable con el administrador',500)
    }
    
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser
}