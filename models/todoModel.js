const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const todoSchema = new Schema({
  id: Number,
  title: String,
  completed: Boolean,
}, { collection: 'TodoList' });

                  // using schame to create an model
module.exports = mongoose.model('Todo', todoSchema);
