'use strict';

var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var todos = require('./controllers/todos');
var app = koa();

app.use(logger());

app.use(route.get('/', todos.list));
app.use(route.get('/todo/new', todos.add));
app.use(route.get('/todo/:id', todos.show));
app.use(route.get('/todo/delete/:id', todos.remove));
app.use(route.get('/todo/edit/:id', todos.edit));
app.use(route.post('/todo/create', todos.create));
app.use(route.post('/todo/update', todos.update));

app.listen(4000);