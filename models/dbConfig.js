const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Mongodb connecté avec grâce a mongodb sur users'))
.catch(err => console.log(err) );

