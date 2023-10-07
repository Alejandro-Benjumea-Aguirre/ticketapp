const httpError = require('../helpers/handleError');
const express = require('express');
const userModel = require('../models/users');

const getUsers = async(req, res) => {

    res.status(200).json({ 
        status: true,
        msg: "listAll" 
    });

    /* try {
        const listAll = await userModel.findAll();
        res.status(200).json({ 
            status: true,
            msg: listAll 
        });
    } catch (e) {
        httpError(res, e);
    } */
}

const getUser = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByPk( id );
        if(user){
            return res.status(200).json({ 
                stauts: true,
                msg: user 
            });
        }else{
            return res.status(404).json({
                        status: false,
                        msg: `No existe ningun usuario con el id ${id}`
                    });
        } 
    } catch (e) {
        httpError(res, e);
    }
}

const postUser = async(req, res) => {
    try {
        
    } catch (error) {
        httpError(res, e);
    }
}

const patchUser = (req, res) => {


}

const deleteUser = (req, res) => {

}

module.exports = {
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteUser
}