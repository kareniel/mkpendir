var path = require('path')
var fse = require('fs-extra')
var snakeCase = require('snake-case')
var usage = require('./usage')

var args = process.argv.slice(2)

var machineName = args[1]

module.exports = addMachine

function addMachine () {
  if (!isInsideValidProject()) {
    process.stdout.write('Not inside a valid project', process.cwd())
    process.exit(1)
  }

  if (!machineName) {
    process.stdout.write(usage)
    process.exit(1)
  }
  
  machineName = snakeCase(machineName)

  var dest = path.join(process.cwd(), 'machines', machineName)

  if (fse.pathExistsSync(dest)) {
    process.stdout.write('A machine with that name already exists.\n')
    process.exit(1)
  }


  copyTemplate(dest)
  renameMarkdownFile(dest, machineName)
}

function isInsideValidProject () {
  return fse.pathExistsSync(path.join(process.cwd(), 'project.yml'))
}

function copyTemplate (dest) {
  fse.copySync(path.join(__dirname, '../templates/machine'), dest)
}

function renameMarkdownFile (dest, machineName) {
  var src = path.join(dest, 'machine.md')
  dest = path.join(dest, machineName + '.md')

  fse.move(src, dest)
}
