const mongoose = require('mongoose');

const schema = mongoose.Schema({ user_id: String, score: Number});
const Score = mongoose.model('Score', schema);

// Score.create({user_id: '101', score: 33}, (error, user) => {
//     if (error) console.log(`Score creation failed with error ${JSON.stringify(error, null, 2)}`);
// });

// Score.create({user_id: '102', score: 66}, (error, user) => {
//     if (error) console.log(`Score creation failed with error ${JSON.stringify(error, null, 2)}`);
// });

module.exports = Score;