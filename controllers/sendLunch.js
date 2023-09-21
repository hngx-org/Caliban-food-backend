const express = require('express');

const lunches = require('../models/lunches');

const sendLunch = async(req, res) => {
    try{
        const {receiverId, quantity, note} = req.body;
        const senderId = req.user.id;
        const receiver = await User.findByPk(receiverId);

        if(!receiver){
            console.log('User not found');
            return res.status(404).send('User not found')
        }

        const lunch = await lunches.create({
            receiverId, 
            senderId, 
            note,
            quantity
        })

        return res.status(201).json({
            message: 'Lunch request created successfully',
            data: lunch
        })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = sendLunch;