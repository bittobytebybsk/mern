const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectdb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    
    console.log('database connected');
  } catch (err) {
    console.log('console : Erer' + err.message);
    
    //process exit when failure
    process.exit(1);
  }
};

module.exports = connectdb;
