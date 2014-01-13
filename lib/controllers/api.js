'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Blog = mongoose.model('Blog');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.blog = {};

exports.blog.save = function(req, res) {
  return new Blog(req.body).save(function(err, object) {
    if(err) {
      return res.send(404, err);
    }

    return res.json(object);
  });
};

exports.blog.get = function(req, res) {
  Blog.find(function(err, blogs) {
    res.json(blogs);
  });
};

exports.blog.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  Blog.findOneAndUpdate({_id: req.params.id}, req.body, function(err, updatedBlog) {
    if(err) {
      return res.send(500, err);
    }

    return res.json(updatedBlog);
  });
};

exports.blog.del = function(req, res) {
  Blog.remove({_id: req.params.id}, function(err) {
    if(err) {
      return res.send(500, err);
    }

    return res.send(200);
  });
};
