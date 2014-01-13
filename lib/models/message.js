'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var MessageSchema = new Schema({
  message: String,
  receiveDate: String,
  user: String,
  serverDate: Date
});

mongoose.model('Message', MessageSchema);
