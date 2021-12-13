const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { isUniqueEmail } = require('../services/auth')

const { body, validationResult } = require('express-validator');

const userRegisterValidation = [
    body('email').isEmail().custom(async (value) => {
        try {
            await isUniqueEmail(value)
        } catch (error) {
            throw error;
        }
    }),
    body('password').isLength({ min: 7 }).custom( (value, { req }) => {
        if (value !== req.body.confirmPassword) {
            throw new Error('Passwords do not match!');
          }
          return true;
    }),
    body('name').notEmpty(),

    ((req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        next()
    })
]

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
        const decoded = await jwt.verify(token, config.tokenSecret)
        req.userId = decoded.data.userId
        next()
    } catch (error) {
        res.status(401).send(error.toString())
    }
}

module.exports = { userRegisterValidation, authenticateToken }
