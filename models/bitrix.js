const mongoose = require('../libs/mongooseBitrix');
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  id: {
    type: String,
    unique: true,
  },
  companyName: String,
  comments: String,
  email: [
    String
  ],
  adress: String,
  inn: String,
  phone: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const bitrixCompany = mongoose.model('bitrixcompany', schema);

module.exports = bitrixCompany;
