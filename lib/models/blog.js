'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var BlogSchema = new Schema({
  content: String,
  author: String,
  title: String,
  created: Date
});

/**
 * Validations
ThingSchema.path('awesomeness').validate(function (num) {
  return num >= 1 && num <= 10;
}, 'Awesomeness must be between 1 and 10');
 */

mongoose.model('Blog', BlogSchema);
