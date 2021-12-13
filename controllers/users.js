const users = require('../dba/userDBA');
const authService = require('../services/auth');
const scores = require('../dba/scoreDBA');

async function signUp(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    try {
        const user = await users.addNew(name, email, await authService.getHash(password))
        res.send(user)
    } catch (error) {
        res.status(404).send(error.toString())
    }
}

async function signIn(req, res, next) {
    try {
        const user = await users.getByName(req.body.username)
        if (req.body.password == user.password) {
            const token = authService.generateAccessToken(user.user_id)
            res.send({ 'session': token })
        } else {
            res.status(404).send('Incorrect Password')
        }
    } catch (error) {
        res.status(404).send(error.toString())
    }
}

async function getScores(req, res, next) {
    const userId = req.userId;
    if (userId) {
        try {
            const score = await scores.getById(userId);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ 'score': score.score }, null, 3));
        } catch (error) {
            res.status(404).send('Record not found');
        }
    } else {
        res.status(404).send('User not found');
    }
}

module.exports = { signIn, getScores, signUp }

// try to get it from jwt
// try to return JSON in output