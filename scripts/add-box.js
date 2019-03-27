var path = require('path')
var fse = require('fs-extra')
var snakeCase = require('snake-case')
var usage = require('./usage')

var args = process.argv.slice(2)

const src = path.join(__dirname, '../templates/box')
var boxName = args[1]

module.exports = addBox

function addBox () {
  if (!isInsideValidProject()) {
    process.stdout.write('Not inside a valid project', process.cwd())
    process.exit(1)
  }

  if (!boxName) {
    process.stdout.write(usage)
    process.exit(1)
  }
  
  boxName = snakeCase(boxName)

  var dest = path.join(process.cwd(), boxName)

  if (fse.pathExistsSync(dest)) {
    process.stdout.write('A box with that name already exists.\n')
    process.exit(1)
  }


  copyTemplate(dest)
  renameMarkdownFile(boxName)
}

function isInsideValidProject () {
  return fse.pathExistsSync(path.join(process.cwd(), 'project.yml'))
}

function copyTemplate (dest) {
  fse.copySync(src, dest)
}

function renameMarkdownFile (boxName) {
  var src = path.join(process.cwd(), boxName,'box.md')
  var dest = path.join(process.cwd(), boxName, boxName + '.md')

  fse.move(src, dest)
}
