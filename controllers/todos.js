'use strict';

var parse = require('co-body');
var render = require('./../render');
// Just for now! MongoDB coming next.
var todos = [];

// List all todos!
exports.list = function *() {
  this.body = yield render('index', { todos: todos});
};

// Form for create new todo item.
exports.add = function *() {
  this.body = yield render('new');
};

// Form for edit new todo items.
exports.edit = function *(id) {
  var todo = todos[id];
  if (!todo) this.throw(404, 'Error!');
  this.body = yield render('edit', { todo: todo });
};

// Show details of a todo item.
exports.show = function *(id) {
  var todo = todos[id];
  if (!todo) this.throw(404, 'Error!');
  this.body = yield render('show', { todo: todo });
};

// Delete Todo
exports.remove = function *(id) {
  var todo = todos[id];
  if (!todo) this.throw(404, 'Error!');
  todos.splice(id, 1);
  for (var i = 0; i < todos.length; i++) {
    todos[i].id = 1;
  }
  this.redirect('/');
};

// Create Todo
exports.create = function *() {
  var todo = yield parse(this);
  todo.created_on = new Date();
  todo.update_on = new Date();
  var id = todos.push(todo);
  todo.id = id - 1;
  this.redirect('/');
};

// Update Todo
exports.update = function *() {
  var todo = yield parse(this);
  var index = todo.id;
  todos[index].name = todo.name;
  todos[index].description = todo.description;
  todos[index].update_on = new Date();
  this.redirect('/');
};