const mongoose = require('mongoose');
const User = require('../models/user');

async function addNew(name, email, password) {
    try {
        return await User.create({ name: name, email: email, password: password })
    } catch (error) {
        throw error
    }
}

async function getByEmail(email) {
    try {
        return await User.find({ email: email })
    } catch (error) {
        throw error
    }
}

module.exports = { addNew, getByEmail }