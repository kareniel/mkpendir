var path = require('path')
var fse = require('fs-extra')
var usage = require('./usage')

var args = process.argv.slice(2)

const src = path.join(__dirname, '../templates/project')
const dest = args[0]

module.exports = scaffold

function scaffold () {
  if (!dest) {
    process.stdout.write(usage)
    process.exit(1)
  }

  if (fse.pathExistsSync(dest)) {
    process.stdout.write('Destination exists.\n')
    process.exit(1)
  }

  fse.copySync(src, dest)

  process.stdout.write(path.join(process.cwd(), dest) + '\n')
}
