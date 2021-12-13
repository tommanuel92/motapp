const mongoose = require('mongoose');
const Score = require('../models/score');

module.exports.getById = async (id) => {
    return new Promise((resolve, reject) => {
        Score.find({ user_id: id }, (error, data) => {
            if (error) {
                reject(error);
            }
            if (data.length > 0) {
                resolve(data[0]);
            } else {
                reject(new Error('No records found for the user'));
            }
            
        });
    });
}