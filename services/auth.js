const jwt = require('jsonwebtoken')
const config = require('./../config/config')
const bcrypt = require('bcryptjs')
const userDBA = require('../dba/userDBA');

function generateAccessToken(userId) {
    try {
        const expiryDate = Math.floor(Date.now() / 1000) + (60 * 60)
        return jwt.sign({exp: expiryDate, data: {userId}}, config.tokenSecret);
    } catch (error) {
        throw error
    }    
}

async function isUniqueEmail(email) {
    const existingUser = await userDBA.getByEmail(value)
    if (existingUser.length != 0) { throw new Error("Email already exists!") }
    return true
}

async function getHash(password) {
    return await bcrypt.hash(password, bcrypt.genSaltSync())
}

async function authenticate(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = { generateAccessToken, getHash, authenticate, isUniqueEmail }