const { Schema, model} = require('mongoose');

let Prefix = new Schema({
  Guild: String,
  Prefix: String, 
})

module.exports = model('pre', Prefix);