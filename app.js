'use strict';

var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var app = koa();