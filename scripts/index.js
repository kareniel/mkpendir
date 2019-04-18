#!/usr/bin/env node

var scaffoldProject = require('./scaffold')
var usage = require('./usage')

var args = process.argv.slice(2)

const command = args[0]

var fn = {
  add: require('./add-machine')
}[command]

if (!fn)
  fn = scaffoldProject

fn()
